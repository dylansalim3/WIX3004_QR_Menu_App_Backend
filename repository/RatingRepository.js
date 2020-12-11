const Rating = require('./../models/Rating');
const User = require('./../models/User');

exports.createRating = (ratingData) => {
    return Rating.create(ratingData);
}

exports.getRatingsByStoreId = (storeId) => {
    return Rating.findAll({ include: [User], where: { store_id: storeId } });
}