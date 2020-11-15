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

exports.updateUserProfile = (firstName, lastName, profileImg, address, phoneNum, userid) => {
    return db.sequelize
        .query(
            `UPDATE users SET first_name = ${JSON.stringify(firstName)}
          ,last_name = ${JSON.stringify(lastName)}
          ,profileimg = ${JSON.stringify(profileImg)}
          ,address = ${JSON.stringify(address)}
          ,phonenum = ${JSON.stringify(phoneNum)}
          WHERE users.id =${JSON.stringify(userid)}
          `
        );
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

exports.getStudentsCount = () => {
    return User.count({include: [{model: Role}], where: {'$role.name': CUSTOMER}});
}

exports.getTeacherCount = () => {
    return User.count({include: [{model: Role}], where: {'$role.name$': MERCHANT}});
}
