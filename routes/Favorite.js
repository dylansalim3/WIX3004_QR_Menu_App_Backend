const express = require('express');
const favorite = express.Router();
const {FAVORITE_LIST, LOGIN, RECENTLY_STORE_LIST} = require('./../constant/route-constant');
const Mutler = require("../utils/mutler.util");

const FavoriteController = require("../controller/FavoriteController");
favorite.get(FAVORITE_LIST, FavoriteController.favoriteList);
favorite.get(RECENTLY_STORE_LIST, FavoriteController.recentStoreList);
module.exports = favorite;
