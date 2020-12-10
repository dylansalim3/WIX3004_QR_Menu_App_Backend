const express = require('express');
const ItemCategoryController = require('./../controller/ItemCategoryController');
const itemCategories = express.Router();
const { CREATE_ITEM_CATEGORY, GET_LAST_POSITION_BY_STORE_ID, DELETE_ITEM_CATEGORY } = require('./../constant/route-constant');

itemCategories.post(GET_LAST_POSITION_BY_STORE_ID, ItemCategoryController.getCurrentPositionByStoreId);

itemCategories.post(CREATE_ITEM_CATEGORY, ItemCategoryController.createItemCategory);

itemCategories.post(DELETE_ITEM_CATEGORY,ItemCategoryController.deleteItemCategory);

module.exports = itemCategories;