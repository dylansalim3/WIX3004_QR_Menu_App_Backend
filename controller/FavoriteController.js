const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const FavoriteRepository = require("../repository/FavoriteRepository");
const StoreRepository = require("../repository/StoreRepository");
const { buildResetPasswordEmail, buildVerificationEmail, sendEmail } = require('../utils/emailUtils');
const { MERCHANT } = require('./../constant/constant');
const { USERS, COMPLETE_REGISTRATION } = require('./../constant/route-constant');
const { sequelize } = require('sequelize');
const RatingRepository = require('./../repository/RatingRepository');


exports.favoriteList = async (req, res) => {
    const { userId } = req.query;
    FavoriteRepository.getFavoriteByUserId(userId).then(async favStores => {
        const storeDetailList = await Promise.all(favStores.map(async favStore => {
            if (favStore.merchant != undefined && favStore.merchant.store != undefined) {
                let data = JSON.stringify(favStore.merchant.store);
                data = JSON.parse(data);

                let averageRating = 0.0;
                let ratingCount = 0.0;

                const averageResult = await RatingRepository.getAverageRatingsByStoreId(data.id);
                const ratingCountResult = await RatingRepository.getCountByStoreId(data.id);
                if (averageResult.length > 0 && ratingCountResult.length > 0 && averageResult[0].rating != null && ratingCountResult[0].get('count') != null) {
                    averageRating = averageResult[0].rating;
                    ratingCount = ratingCountResult[0].get('count');
                }

                data['average_rating'] = averageRating;
                data['rating_count'] = ratingCount;

                console.log(data);
                return data;
            }
        }))

        console.log("store detail list");
        console.log(storeDetailList);

        res.json({ msg: "success", data: storeDetailList });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Error occurred" });
    });
}

exports.recentStoreList = (req, res) => {
    const { userId } = req.query;
    FavoriteRepository.getRecentStoreByUserId(userId).then(async recentStores => {

        const storeDetailList = await Promise.all(recentStores.map(async recentStore => {
            if (recentStore.viewed_merchant != undefined && recentStore.viewed_merchant.store != undefined) {
                let data = JSON.stringify(recentStore.viewed_merchant.store);
                data = JSON.parse(data);

                let averageRating = 0.0;
                let ratingCount = 0.0;

                const averageResult = await RatingRepository.getAverageRatingsByStoreId(data.id);
                const ratingCountResult = await RatingRepository.getCountByStoreId(data.id);
                if (averageResult.length > 0 && ratingCountResult.length > 0 && averageResult[0].rating != null && ratingCountResult[0].get('count') != null) {
                    averageRating = averageResult[0].rating;
                    ratingCount = ratingCountResult[0].get('count');
                }

                data['average_rating'] = averageRating;
                data['rating_count'] = ratingCount;

                console.log(data);
                return data;
            }
        }))

        res.json({ msg: "success", data: storeDetailList });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Error occurred" });
    });
}

exports.addToFavorite = (req, res) => {
    const { userId, storeId } = req.body;
    try {
        StoreRepository.getStoreByPk(storeId).then(store => {
            if (store === null) {
                res.status(500).json({ msg: "Error occurred" });
                return;
            }
            const merchantId = store.user_id;
            FavoriteRepository.createFavoriteStore(userId, merchantId).then(result => {
                res.json({ msg: "Favorite Added" });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error occurred" })
    }
}

exports.deleteFavorite = (req, res) => {
    const { userId, storeId } = req.body;
    try {
        StoreRepository.getStoreByPk(storeId).then(store => {
            if (store === null) {
                res.status(500).json({ msg: "Error occurred" });
                return;
            }
            const merchantId = store.user_id;
            FavoriteRepository.removeFavoriteStore(userId, merchantId).then(result => {
                res.json({ msg: "Favorite Deleted" });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error occurred" })
    }
}

exports.addToRecentlyViewed = (req, res) => {
    const { userId, storeId } = req.body;
    try {
        StoreRepository.getStoreByPk(storeId).then(store => {
            if (store === null) {
                res.status(500).json({ msg: "Error occurred" });
                return;
            }
            const merchantId = store.user_id;
            FavoriteRepository.createRecentlyViewedStore(userId, merchantId).then(result => {
                res.json({ msg: "Recently Viewed Added" });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error occurred" })
    }
}