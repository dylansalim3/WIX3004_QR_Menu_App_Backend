const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'item',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_category_id: {
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
        desc: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.DOUBLE,
        },
        promo_price: {
            type: Sequelize.DOUBLE,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        item_img: {
            type: Sequelize.STRING,
        },
        recommended: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        hidden: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        currency: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);
