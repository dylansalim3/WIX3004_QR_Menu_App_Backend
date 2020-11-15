const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'promotion',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_id: {
            type: Sequelize.INTEGER,
        },
        store_id: {
            type: Sequelize.INTEGER,
        },
        promo_start_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        promo_end_date: {
            type: Sequelize.DATE,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);