const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'report',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
        },
        desc: {
            type: Sequelize.STRING,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        processedDate: {
            type: Sequelize.DATE,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);