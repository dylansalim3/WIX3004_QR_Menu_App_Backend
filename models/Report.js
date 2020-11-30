const Sequelize = require('sequelize')
const db = require("../database/db.js")
const {REPORT_STATUS} = require("../constant/constant");

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
        store_id: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: REPORT_STATUS.PENDING
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
