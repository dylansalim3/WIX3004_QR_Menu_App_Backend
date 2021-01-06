const RoleRepository = require("./RoleRepository");
const User = require('../models/User');
const Role = require('../models/Role');
const db = require('../database/db.js');
const {CUSTOMER, MERCHANT} = require('../constant/constant');
const {Op, Sequelize} = require("sequelize");

exports.findUserByEmail = (email) => {
    return User.findOne({
        where: {
            email: email,
        },
    });
}

exports.findAllUserByEmail = (emails) => {
    return User.findAll({where: {email: emails}});
}

exports.findUserById = (id) => {
    return User.findOne({where: {id: id}});
}

exports.findAllUserById = (idList) => {
    return User.findAll({where: {id: idList}});
}

exports.createUser = (userData, arguments) => {
    return User.create(userData, arguments);
}

exports.updateUserProfile = async (firstName, lastName, address, phoneNum, userid) => {
    await db.sequelize
        .query(
            `UPDATE user SET first_name = ${JSON.stringify(firstName)}
          ,last_name = ${JSON.stringify(lastName)}
          ,address = ${JSON.stringify(address)}
          ,phone_num = ${JSON.stringify(phoneNum)}
          WHERE user.id =${JSON.stringify(userid)}
          `
        );
    return User.findOne({where: {id: userid}});
}

exports.updatePicture = async (userId, imagePath) => {
    const user = await User.findOne({where: {id: userId}});
    user.profile_img = imagePath;
    return user.save();
}

exports.findUserByEmailAndRole = (email, role) => {
    return db.sequelize
        .query(
            `SELECT users.* FROM users INNER JOIN user_role ON users.id = user_role.user_id
                INNER JOIN role ON user_role.role_id = role.id
                WHERE 
                role.role = ${JSON.stringify(role)} 
                AND users.email = ${JSON.stringify(email)}`,
            {type: db.sequelize.QueryTypes.SELECT}
        );
}

exports.checkUserExist = async (userId) => {
    const userExist = await User.count({where: {id: userId}});
    return userExist;
}

exports.checkUserExistByEmail = async (email) => {
    const userExist = await User.count({where: {email: email}});
    return userExist > 0;
}

exports.findUserByVerificationHash = (verificationHash) => {
    return User.findOne({include: Role, where: {verification_hash: verificationHash}});
}

exports.updateUserVerificationHashByEmail = (email, verification_hash) => {
    return User.findOne(
        {where: {email: email}}).then(user => {
        user.verification_hash = verification_hash;
        user.save();
        return user;
    });
}

exports.updatePasswordByEmail = (email, password) => {
    return User.findOne({where: {email: email}}).then(user => {
        user.password = password;
        user.verification_hash = null;
        user.save();
        return user;
    });
}

exports.getCustomerCount = () => {
    return User.count({include: [{model: Role}], where: {'$role.name': CUSTOMER}});
}

exports.getMerchantCount = () => {
    return User.count({include: [{model: Role}], where: {'$role.name$': MERCHANT}});
}

exports.updateUserRole = async (userId, roleId) => {
    const user = await User.findOne({where: {id: userId}});
    user.role_id = roleId;
    await user.save();
    return user;
}

exports.updateFCM = async (id, fcmToken) => {
    try {
        const oldUser = await User.findOne({where: {fcm_token: fcmToken}});
        if (oldUser) {
            oldUser.fcm_token = null;
            oldUser.save();
        }
    } catch (err) {
        console.error(err);
    }
    return User.findOne({where: {id: id}}).then(user => {
        user.fcm_token = fcmToken;
        return user.save();
    })
}

exports.getFCM = id => {
    return User.findOne({where: {id: id}}).then(user => {
        return user.fcm_token;
    })
}
