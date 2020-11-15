const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'recently_viewed_merchant',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        merchant_id: {
            type: Sequelize.INTEGER,
        },
        created:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);