const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'rating',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        store_id: {
            type: Sequelize.INTEGER,
        },
        user_id:{
            type: Sequelize.INTEGER,
        },
        rating: {
            type: Sequelize.DOUBLE,
        },
        desc: {
            type: Sequelize.STRING,
        },
        created: {
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