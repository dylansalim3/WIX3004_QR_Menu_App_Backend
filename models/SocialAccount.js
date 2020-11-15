const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'social_account',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        store_id: {
            type: Sequelize.INTEGER,
        },
        tag: {
            type: Sequelize.STRING,
        },
        link: {
            type: Sequelize.STRING,
        },
        social_account_type_id: {
            type: Sequelize.INTEGER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);