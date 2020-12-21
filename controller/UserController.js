const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require("../repository/UserRepository");
const RoleRepository = require("../repository/RoleRepository");
const StoreRepository = require('./../repository/StoreRepository');
const MulterError = require("multer/lib/multer-error");
const { newUserNotification } = require("../controller/NotificationController");
const { buildResetPasswordEmail, buildVerificationEmail, sendEmail } = require('../utils/emailUtils');
const { CUSTOMER, MERCHANT } = require('./../constant/constant');
const { USERS, COMPLETE_REGISTRATION } = require('./../constant/route-constant');
const { sequelize } = require('sequelize');

exports.getUserById = (req, res) => {
    UserRepository.findUserById(req.params.id).then(result => {
        res.send({ userdata: result });
    });
}

exports.updateUserProfile = (req, res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const address = req.body.address;
    const phoneNum = req.body.phonenum;
    const userId = req.token.id;

    UserRepository.updateUserProfile(firstName, lastName, address, phoneNum, userId)
        .then(async (user) => {
            const token = await signToken(user);
            res.json({ token: token });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ err: err });
        })
}

exports.registerUser = async (req, res) => {
    const today = new Date();
    const roleId = req.body.roleId;
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone_num: req.body.phone_num,
        address: req.body.address,
        created: today,
        active: false,
    };

    const selectedRole = await RoleRepository.findRoleById(roleId);

    const verification_hash = bcrypt.hashSync(req.body.email, 10).replace('/', '.');


    if (selectedRole != null) {
        UserRepository.findUserByEmail(userData.email)
            .then((user) => {
                if (!user) {
                    return bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash;
                        return UserRepository.createUser(userData)
                            .then(async (user) => {
                                user.role_id = selectedRole.id;
                                user.verification_hash = verification_hash;
                                user.save();
                                const registrationLink = 'http://' + req.headers.host + USERS + COMPLETE_REGISTRATION + '/' + verification_hash;
                                const { subject, text } = buildVerificationEmail(userData.email, registrationLink);
                                await sendEmail(userData.email, subject, text, res);

                                let mydata = JSON.stringify(user);
                                mydata = JSON.parse(mydata);
                                const role = await RoleRepository.findRoleById(user.role_id);
                                mydata['role'] = role.name;

                                if (role.name === MERCHANT) {
                                    const store = await StoreRepository.getStoreByUserId(mydata.id);
                                    if (store != undefined) {
                                        mydata['store_id'] = store.id;
                                        mydata['store_name'] = store.name;
                                    }
                                }

                                await newUserNotification(mydata.id).catch(console.error);

                                let token = jwt.sign(mydata, process.env.SECRET_KEY);
                                res.send({ msg: "success", data: {token} });
                                return user;
                            });
                    });
                } else {
                    throw Error("User already exists");
                }
            }).catch((err) => {
                console.log(err.toString());
                res.status(500).send("Registration failed");
            });
    } else {
        res.status(404).json('error: Role is invalid');
    }
}

exports.login = (req, res) => {
    UserRepository.findUserByEmail(req.body.email)
        .then(async (results) => {
            if (results) {
                console.log('user exists');

                if (bcrypt.compareSync(req.body.password, results.password)) {
                    let mydata = JSON.stringify(results);
                    mydata = JSON.parse(mydata);
                    const role = await RoleRepository.findRoleById(results.role_id);
                    mydata['role'] = role.name;
                    console.log(JSON.stringify(mydata));

                    if (role.name === MERCHANT) {
                        const store = await StoreRepository.getStoreByUserId(mydata.id);
                        if (store != undefined) {
                            mydata['store_id'] = store.id;
                            mydata['store_name'] = store.name;
                        }
                    }

                    let token = jwt.sign(mydata, process.env.SECRET_KEY);
                    console.log("Correct password");
                    res.send({ msg: "success", data: {token} });

                } else {
                    console.log('Wrong password');
                    res.status(400).json({ msg: 'Wrong password' });
                }
            } else {
                console.log('user does not exist');
                res.status(404).json({ msg: "User does not exist" })
            }
        })
        .catch((err) => {
            res.status(400).json({ msg: err.toString() });
        });
}

exports.completeRegistration = (req, res) => {
    const { vh } = req.params;

    UserRepository.findUserByVerificationHash(vh).then(user => {
        console.log(user)
        if (user !== null) {
            UserRepository.findUserById(user.id).then(user => {
                user.active = true;
                user.verification_hash = '';
                return user.save();
            }).then(result => {
                res.json({ msg: "Email has been verified" });
            }).catch(err => {
                res.status(400).json({ msg: err });
            })
        } else {
            throw Error("User is not exist");
        }
    }).catch(err => {
        res.status(400).json(err.toString());
    });


}

exports.getUserByVerificationHash = (req, res) => {
    const hash = req.body.hash;

    UserRepository.findUserByVerificationHash(hash).then(user => {
        const dto = {
            "user": user,
            "role": user.roles[0]
        };
        res.json(dto);
    }).catch(err => {
        res.status(400).json({ msg: 'User have been registered', error: err.toString() });
    });
}

exports.updateFCM = (req, res) => {
    const id = req.body.id;
    const fcmToken = req.body.fcm_token;

    UserRepository.updateFCM(id, fcmToken)
        .then(() => res.status(200).json({ msg: "fcm updated" }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ err: err });
        });
}

exports.sendForgetPasswordEmail = (req, res) => {
    const { email, resetPasswordLinkPrefix } = req.body;
    const isUserExisted = UserRepository.checkUserExistByEmail(email);
    if (!isUserExisted) {
        res.status(400).json({ error: "User not found" });
    }

    const user = UserRepository.findAllUserByEmail(email);

    if (user.verification_hash != null) {
        res.status(400).json({ error: "User has registered. Please refer to your email to activate your account." });
    }

    const hashEmail = bcrypt.hashSync(email, 10).replace('/', '.');

    console.log('received email address : ' + email);
    UserRepository.updateUserVerificationHashByEmail(email, hashEmail).then(async result => {
        const resetPasswordLink = resetPasswordLinkPrefix + '/' + hashEmail;
        const { subject, text } = buildResetPasswordEmail(resetPasswordLink);
        await sendEmail(email, subject, text, res);
        res.json({ message: "Email sent" });
    }).catch(err => {
        console.log(err.toString);
        res.status(500).json({ error: "Error occurred. Please try again later" });
    })

}

exports.resetPassword = async (req, res) => {
    const { email, verificationHash, newPassword } = req.body;
    let isEmailEqual = false;
    try {
        const user = await UserRepository.findUserByVerificationHash(verificationHash);
        isEmailEqual = user.email === email;
    } catch (err) {
        console.log(err.toString());
        res.status(404).json({ error: "User does not exist" });
    }
    try {
        if (isEmailEqual) {
            const hashPassword = bcrypt.hashSync(newPassword, 10);
            UserRepository.updatePasswordByEmail(email, hashPassword).then(result => {
                res.json({ message: "Password updated successfully" });
            })
        } else {
            res.status(404).json({ error: "Unauthorized access" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error occurred. Please try again later." })
    }
}

exports.updateRole = async (req, res) => {
    const userId = req.token.id;
    const role = req.body.role;

    if (!role || !userId) {
        console.error("Role or user id is empty");
        res.status(400).json({ err: "Role or user id is empty" });
        return;
    }

    try {
        const allRoles = await RoleRepository.findAllRole();
        const roleId = allRoles.find(r => r.dataValues.name === role).id;
        const user = await UserRepository.updateUserRole(userId, roleId);
        const token = await signToken(user);
        res.send({ token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err });
    }
}

exports.getPictureUrl = async (req, res) => {
    const userId = req.body.user_id;

    if (!userId) {
        return res.status(400).json({ err: "user id is missing" });
    }

    try {
        const user = await UserRepository.findUserById(userId);
        const url = user.dataValues.profile_img;
        res.json({ url: url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err });
    }

}

exports.updatePicture = async (req, res) => {
    const file = req.file;
    const userId = req.token.id;

    if (!file) {
        return res.status(500).json({ err: "file not found" });
    }
    if (!userId) {
        return res.status(400).json({ err: "user id is missing" });
    }

    try {
        await UserRepository.updatePicture(userId, file.path);
        res.json({ msg: "picture updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err });
    }
}

exports.updatePictureError = async (err, req, res, next) => {
    if (err instanceof MulterError) {
        console.error(err);
        return res.status(400).json({ err: err.code });
    }
    if (req.multer_error) {
        console.error(req.multer_error);
        return res.status(400).json({ err: req.multer_error });
    }
    console.error(err);
    res.status(500).json({ err: err });
}

const signToken = async (user) => {
    const mydata = JSON.parse(JSON.stringify(user));
    const role = await RoleRepository.findRoleById(user.role_id);

    mydata['role'] = role.name;

    if (role.name === MERCHANT) {
        const store = await StoreRepository.getStoreByUserId(mydata.id);
        if (store && store.id) {
            mydata['store_id'] = store.id;
            mydata['store_name'] = store.name;
        }
    }
    return jwt.sign(mydata, process.env.SECRET_KEY);
}
