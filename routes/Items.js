const express = require('express');
const items = express.Router();
const ItemController = require("../controller/ItemController");
const { CREATE_ITEM, GET_ALL_ITEMS_BY_STORE_ID, GET_ITEM_BY_ID, UPDATE_RECOMMENDED_STATUS, UPDATE_HIDDEN_STATUS, UPDATE_ITEM, DELETE_ITEM } = require('./../constant/route-constant');
const Mutler = require("../utils/mutler.util");

items.post(CREATE_ITEM, Mutler.uploadStoreItemImage.single('file'), ItemController.createItem);

items.post(UPDATE_ITEM, Mutler.uploadStoreItemImage.single('file'), ItemController.updateItem);

items.post(GET_ALL_ITEMS_BY_STORE_ID, ItemController.getAllItemByStoreId);

items.post(GET_ITEM_BY_ID, ItemController.getItemByPk);

items.post(UPDATE_RECOMMENDED_STATUS, ItemController.updateRecommendedStatus);

items.post(UPDATE_HIDDEN_STATUS, ItemController.updateHiddenStatus);

items.post(DELETE_ITEM, ItemController.deleteItem);

module.exports = items;