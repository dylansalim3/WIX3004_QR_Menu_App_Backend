const express = require('express');
const items = express.Router();
const ItemController = require("../controller/ItemController");
const { CREATE_ITEM, GET_ALL_ITEMS_BY_STORE_ID, GET_ITEM_BY_ID, UPDATE_RECOMMENDED_STATUS, UPDATE_HIDDEN_STATUS } = require('./../constant/route-constant');

items.post(CREATE_ITEM, ItemController.createItem);

items.post(GET_ALL_ITEMS_BY_STORE_ID, ItemController.getAllItemByStoreId);

items.post(GET_ITEM_BY_ID, ItemController.getItemByPk);

items.post(UPDATE_RECOMMENDED_STATUS, ItemController.updateRecommendedStatus);

items.post(UPDATE_HIDDEN_STATUS, ItemController.updateHiddenStatus);

module.exports = items;