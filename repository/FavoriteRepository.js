const Favorite = require('../models/FavoriteMerchant');
const RecentlyViewedMerchant = require('../models/RecentlyViewedMerchant');
const Store = require('../models/Store');
const User = require('../models/User');


exports.getFavoriteByUserId = (userId) => {
    return Favorite.findAll({ include: [{ model: User, as:"customer", include: [{model:Store}] }], where: { user_id: userId } });
}

exports.getRecentStoreByUserId = (userId) => {
    return RecentlyViewedMerchant.findAll({ include: [{ model: User, as:"viewed_customer", include: [{model:Store}] }], where: { user_id: userId } });
}