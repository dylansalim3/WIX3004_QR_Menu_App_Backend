const Item = require('./../models/Item');

exports.createItem = (itemData) => {
    return Item.create(itemData);
}

exports.getItemsByItemCategoryId = (itemCategoryId) => {
    return Item.findOne({ where: { item_category_id: itemCategoryId } });
}

exports.getItemByPk = (id) => {
    return Item.findByPk(id);
}

exports.setHiddenStatus = (id, status) => {
    return Item.findOne({ where: { id } }).then(result => {
        result.hidden = status;
        return result;
    });
}

exports.setRecommendedStatus = (id, status) => {
    return Item.findOne({ where: { id } }).then(result => {
        result.recommended = status;
        return result;
    });
}