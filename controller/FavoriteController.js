const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const FavoriteRepository = require("../repository/FavoriteRepository");
const StoreRepository = require("../repository/StoreRepository");
const { buildResetPasswordEmail, buildVerificationEmail, sendEmail } = require('../utils/emailUtils');
const { MERCHANT } = require('./../constant/constant');
const { USERS, COMPLETE_REGISTRATION } = require('./../constant/route-constant');
const { sequelize } = require('sequelize');


exports.favoriteList = (req, res) => {
    const { userId } = req.query;
    FavoriteRepository.getFavoriteByUserId(userId).then(favStores => {
        const storeDetailList = favStores.map(favStore => {
            if (favStore.customer != undefined && favStore.customer.store != undefined) {
                return favStore.customer.store;
            }
        })

        res.json({ msg: "success", data: storeDetailList });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Error occurred" });
    });
}

exports.recentStoreList = (req, res) => {
    const { userId } = req.query;
    FavoriteRepository.getRecentStoreByUserId(userId).then(recentStores => {
        const storeDetailList = recentStores.map(recentStore => {
            if (recentStore.viewed_customer != undefined && recentStore.viewed_customer.store != undefined) {
                return recentStore.viewed_customer.store;
            }
        })

        res.json({ msg: "success", data: storeDetailList });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Error occurred" });
    });
}