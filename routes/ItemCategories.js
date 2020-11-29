const express = require('express');
const ItemCategoryController = require('./../controller/ItemCategoryController');
const itemCategories = express.Router();
const { CREATE_ITEM_CATEGORY, GET_LAST_POSITION_BY_STORE_ID } = require('./../constant/route-constant');

itemCategories.post(GET_LAST_POSITION_BY_STORE_ID, ItemCategoryController.getCurrentPositionByStoreId);

itemCategories.post(CREATE_ITEM_CATEGORY, ItemCategoryController.createItemCategory);

module.exports = itemCategories;