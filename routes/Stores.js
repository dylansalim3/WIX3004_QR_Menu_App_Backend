const express = require("express");
const stores = express.Router();
const { CREATE_STORE, GET_STORE_BY_USER_ID, GET_STORE_BY_STORE_ID } = require('./../constant/route-constant')
const StoreController = require('./../controller/StoreController');

stores.post(CREATE_STORE, StoreController.createStore);

stores.post(GET_STORE_BY_USER_ID, StoreController.getStoreByUserId);

stores.post(GET_STORE_BY_STORE_ID, StoreController.getStoreByPk);

module.exports = stores;