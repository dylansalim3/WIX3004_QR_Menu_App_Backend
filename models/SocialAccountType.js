const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'social_account_type',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        social_img: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);