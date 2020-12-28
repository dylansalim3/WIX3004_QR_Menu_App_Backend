const express = require('express');
const favorite = express.Router();
const { GET_FAV_LIST, GET_RECENTLY_VIEWED_LIST, ADD_TO_FAV, REMOVE_FAV, ADD_TO_RECENTLY_VIEWED } = require('./../constant/route-constant');
const Mutler = require("../utils/mutler.util");

const FavoriteController = require("../controller/FavoriteController");

favorite.get(GET_FAV_LIST, FavoriteController.favoriteList);

favorite.get(GET_RECENTLY_VIEWED_LIST, FavoriteController.recentStoreList);

favorite.post(ADD_TO_FAV, FavoriteController.addToFavorite);

favorite.post(REMOVE_FAV, FavoriteController.deleteFavorite);

favorite.post(ADD_TO_RECENTLY_VIEWED, FavoriteController.addToRecentlyViewed);

module.exports = favorite;
