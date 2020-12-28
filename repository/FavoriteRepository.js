const Favorite = require('../models/FavoriteMerchant');
const RecentlyViewedMerchant = require('../models/RecentlyViewedMerchant');
const Store = require('../models/Store');
const User = require('../models/User');


exports.getFavoriteByUserId = (userId) => {
    return Favorite.findAll({ include: [{ model: User, as: "merchant", include: [{ model: Store }] }], where: { user_id: userId } });
}

exports.getRecentStoreByUserId = (userId) => {
    return RecentlyViewedMerchant.findAll({ include: [{ model: User, as: "viewed_merchant", include: [{ model: Store }] }], where: { user_id: userId } });
}

exports.createFavoriteStore = (userId, merchantId) => {
    return Favorite.create({ user_id: userId, merchant_id: merchantId });
}

exports.removeFavoriteStore = (userId, merchantId) => {
    return Favorite.destroy({ where: { user_id: userId, merchant_id: merchantId } });
}

exports.createRecentlyViewedStore = (userId, merchantId) => {
    return RecentlyViewedMerchant.create({ user_id: userId, merchant_id: merchantId });
}

exports.getIsFavoriteMerchant = (userId, merchantId) => {
    return RecentlyViewedMerchant.count({ user_id: userId, merchant_id: merchantId }).then(c => {
        return c > 0;
    });
}