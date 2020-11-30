const db = require('../database/db.js');
const Role = require('../models/Role');

exports.findRoleById = (id) => {
    return Role.findOne({
        where: {
            id: id,
        },
    });
}

exports.findAllRole = () => {
    return Role.findAll();
}

exports.insertRole = (name) => {
    return Role.findOne({where: {name}}).then(result => {
        if (result === null) {
            return Role.create({name});
        }
        throw Error("Role have been created");
    });
}

