const express = require('express');
const favorite = express.Router();
const {REGISTER_USER,LOGIN, COMPLETE_REGISTRATION} = require('./../constant/route-constant');
const Mutler = require("../utils/mutler.util");

const FavoriteController = require("../controller/FavoriteController");
favorite.get("/favorite-list", FavoriteController.favoriteList);
favorite.get("/recently-store-list", FavoriteController.recentStoreList);
module.exports = favorite;
