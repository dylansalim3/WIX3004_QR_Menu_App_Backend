const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'store',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        address:{
            type: Sequelize.STRING,
        },
        postal_code:{
            type: Sequelize.INTEGER,
        },
        city:{
            type: Sequelize.STRING,
        },
        country:{
            type: Sequelize.STRING,
        },
        latitude:{
            type: Sequelize.DOUBLE,
        },
        longitude:{
            type: Sequelize.DOUBLE,
        },
        phone_num:{
            type: Sequelize.STRING,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        ban_until: {
            type: Sequelize.DATEONLY,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);
