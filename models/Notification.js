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
        receiver: {
            type: Sequelize.INTEGER
        },
        isRead: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        created: {
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
