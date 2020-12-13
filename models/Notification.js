const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'notification',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
        },
        body: {
            type: Sequelize.STRING,
        },
        activity: {
            type: Sequelize.STRING,
        },
        data: {
            type: Sequelize.INTEGER,
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        is_read: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        created: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
)
