const Sequelize = require('sequelize');
const db = require("../database/db.js");

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        verification_hash: {
            type: Sequelize.STRING
        },
        profile_img: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone_num: {
            type: Sequelize.STRING
        },
        role_id: {
            type: Sequelize.INTEGER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);