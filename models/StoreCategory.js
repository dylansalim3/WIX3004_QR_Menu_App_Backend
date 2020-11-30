const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'store_category',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        store_id: {
            type: Sequelize.INTEGER,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);