const express = require("express");
const stores = express.Router();
const { CREATE_STORE, GET_STORE_BY_USER_ID, GET_STORE_BY_STORE_ID, GET_GENERATED_QR_CODE, UPDATE_STORE } = require('./../constant/route-constant')
const StoreController = require('./../controller/StoreController');
const Mutler = require("../utils/mutler.util");

stores.post(CREATE_STORE, Mutler.uploadStoreProfileImage.single('file'), StoreController.createStore);

stores.post(GET_STORE_BY_USER_ID, StoreController.getStoreByUserId);

stores.post(GET_STORE_BY_STORE_ID, StoreController.getStoreByPk);

stores.post(GET_GENERATED_QR_CODE, StoreController.getGeneratedQrCode);

stores.post(UPDATE_STORE, Mutler.uploadStoreItemImage.single('file'), StoreController.updateStore);

module.exports = stores;