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
            allowNull: false,
            type: Sequelize.STRING,
        },
        desc: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        store_id: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
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
