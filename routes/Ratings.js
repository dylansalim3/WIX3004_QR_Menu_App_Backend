const RatingController = require("./../controller/RatingController");
const express = require("express");
const ratings = express.Router();
const { CREATE_RATING, GET_ALL_RATING_BY_STORE_ID, GET_AVERAGE_RATING_BY_STORE_ID } = require('./../constant/route-constant');

ratings.post(CREATE_RATING, RatingController.createRating);

ratings.post(GET_ALL_RATING_BY_STORE_ID, RatingController.getAllRatingByStoreId);

ratings.post(GET_AVERAGE_RATING_BY_STORE_ID, RatingController.getAverageRatingByStoreId);

module.exports = ratings;