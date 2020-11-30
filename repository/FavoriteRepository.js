const Favorite = require('./../models/FavoriteMerchant');
const RecentlyViewedMerchant = require('./../models/RecentlyViewedMerchant');


exports.getFavoriteByUserId = (userId) => {
    return Favorite.findAll({ where: { user_id:userId } });
}

exports.getRecentStoreByUserId = (userId) => {
    return RecentlyViewedMerchant.findAll({ where: { user_id:userId } });
}