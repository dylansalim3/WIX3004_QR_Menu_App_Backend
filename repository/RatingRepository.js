const Sequelize = require('sequelize');
const Rating = require('./../models/Rating');
const User = require('./../models/User');

exports.createRating = (ratingData) => {
    return Rating.create(ratingData);
}

exports.getRatingsByStoreId = (storeId) => {
    return Rating.findAll({ include: [User], where: { store_id: storeId } });
}

exports.getAverageRatingsByStoreId = (storeId) => {
    return Rating.findAll({
        where: { store_id: storeId }, attributes: [
            [Sequelize.fn('avg', Sequelize.col('rating')), 'rating']
        ]
    });
}

exports.getCountByStoreId = (storeId) => {
    return Rating.findAll({
        where: { store_id: storeId }, attributes: [
            [Sequelize.fn('count', Sequelize.col('id')), 'count']
        ]
    });
}