const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require("../repository/UserRepository");
const RoleRepository = require("../repository/RoleRepository");
const {buildResetPasswordEmail, buildVerificationEmail, sendEmail} = require('../utils/emailUtils');
const {USERS, COMPLETE_REGISTRATION} = require('./../constant/route-constant');

exports.getUserById = (req, res) => {
    UserRepository.findUserById(req.params.id).then(result => {
        res.send({userdata: result});
    });
}

exports.updateUserProfile = (req, res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const profileImg = req.body.profileimg;
    const address = req.body.address;
    const phoneNum = req.body.phonenum;
    const userId = req.body.userid;

    UserRepository.updateUserProfile(firstName, lastName, profileImg, address, phoneNum, userId)
        .then((result) => {
            res.send({result: result});
        });
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
                                const {subject, text} = buildVerificationEmail(userData.email, registrationLink);
                                await sendEmail(userData.email, subject, text, res);

                                res.json({status: user.email + ' registered'});
                                return user;
                            });
                    });
                } else {
                    throw Error("User already exists");
                }
            }).catch((err) => {
            res.status(500).send(err.toString());
        });
    } else {
        res.status(404).json('error: Role is invalid');
    }
}


exports.loginWithRole = (req, res) => {
    UserRepository.findUserByEmail(req.body.email)
        .then((results) => {
            if (results) {
                console.log('user exists');

                if (bcrypt.compareSync(req.body.password, results.password)) {
                    let mydata = JSON.stringify(results);
                    mydata = JSON.parse(mydata);
                    mydata['role'] = req.body.role;
                    console.log(JSON.stringify(mydata));
                    let token = jwt.sign(mydata, process.env.SECRET_KEY);
                    console.log("Correct password");
                    //check role
                    UserRepository.findUserByEmailAndRole(req.body.email, req.body.role)
                        .then((results) => {
                            if (results) {
                                res.send({token: token});
                            } else {
                                console.log('Wrong role selected');
                                res.status(400).json({error: 'Wrong role selected'});
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({error: "error is here"});
                        });


                } else {
                    console.log('Wrong password');
                    res.status(400).json({error: 'Wrong password'});
                }
            } else {
                console.log('user does not exist');
                res.status(404).json({error: "User does not exist"})
            }
        })
        .catch((err) => {
            res.status(400).json({error: err.toString()});
        });
}

exports.completeRegistration = (req, res) => {
    const {vh} = req.params;

    UserRepository.findUserByVerificationHash(vh).then(user => {
        console.log(user)
        if (user !== null) {
            UserRepository.findUserById(user.id).then(user => {
                user.active = true;
                user.verification_hash = '';
                return user.save();
            }).then(result => {
                res.json("Email has been verified");
            }).catch(err => {
                res.status(400).json({message: err});
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
        res.status(400).json({message: 'User have been registered', error: err.toString()});
    });
}


exports.sendForgetPasswordEmail = (req, res) => {
    const {email, resetPasswordLinkPrefix} = req.body;
    const isUserExisted = UserRepository.checkUserExistByEmail(email);
    if (!isUserExisted) {
        res.status(400).json({error: "User not found"});
    }

    const user = UserRepository.findAllUserByEmail(email);

    if (user.verification_hash != null) {
        res.status(400).json({error: "User has registered. Please refer to your email to activate your account."});
    }

    const hashEmail = bcrypt.hashSync(email, 10).replace('/', '.');

    console.log('received email address : ' + email);
    UserRepository.updateUserVerificationHashByEmail(email, hashEmail).then(async result => {
        const resetPasswordLink = resetPasswordLinkPrefix + '/' + hashEmail;
        const {subject, text} = buildResetPasswordEmail(resetPasswordLink);
        await sendEmail(email, subject, text, res);
        res.json({message: "Email sent"});
    }).catch(err => {
        console.log(err.toString);
        res.status(500).json({error: "Error occurred. Please try again later"});
    })

}

exports.resetPassword = async (req, res) => {
    const {email, verificationHash, newPassword} = req.body;
    let isEmailEqual = false;
    try {
        const user = await UserRepository.findUserByVerificationHash(verificationHash);
        isEmailEqual = user.email === email;
    } catch (err) {
        console.log(err.toString());
        res.status(404).json({error: "User does not exist"});
    }
    try {
        if (isEmailEqual) {
            const hashPassword = bcrypt.hashSync(newPassword, 10);
            UserRepository.updatePasswordByEmail(email, hashPassword).then(result => {
                res.json({message: "Password updated successfully"});
            })
        } else {
            res.status(404).json({error: "Unauthorized access"});
        }
    } catch (err) {
        res.status(500).json({error: "Error occurred. Please try again later."})
    }
}