const { sequelize } = require('../database/db');
const Item = require('../models/Item');
const ItemCategory = require('./../models/ItemCategory');

exports.createItemCategory = (itemCategoryData) => {
    return ItemCategory.create(itemCategoryData);
}

exports.getCurrentPositionByStoreId = (storeId) => {
    return ItemCategory.findAll({ attributes: [sequelize.fn('MAX', sequelize.col('position'))], where: { store_id: storeId } }).then(result => {
        return result.position;
    });
}

exports.getAllItems = (storeId) => {
    return ItemCategory.findAll({ include: [{ model: Item }], where: { store_id: storeId } });
}


exports.deleteItemCategory = (itemCategoryId) => {
    return ItemCategory.destroy({ where: { id: itemCategoryId } });
}