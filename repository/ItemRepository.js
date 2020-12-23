const Item = require('./../models/Item');
const fs = require('fs');

exports.createItem = (itemData) => {
    return Item.create(itemData);
}

exports.getItemsByItemCategoryId = (itemCategoryId) => {
    return Item.findOne({ where: { item_category_id: itemCategoryId } });
}

exports.getItemByPk = (id) => {
    return Item.findByPk(id);
}

exports.updateItem = (itemData, pk) => {
    return Item.findByPk(pk).then(item => {
        if (itemData.item_img !== null) {

            try {
                fs.unlinkSync(item.item_img);
            } catch (err) {
                console.log(err.toString());
            }
            item.item_img = itemData.item_img;

        }
        item.currency = itemData.currency;
        item.name = itemData.name;
        item.desc = itemData.desc;
        item.price = itemData.price;
        item.promo_price = itemData.promo_price;
        item.hidden = itemData.hidden;
        item.recommended = itemData.recommended;
        item.save();
        return item;
    });
}

exports.deleteItem = (pk) => {
    return Item.destroy({ where: { id: pk } });
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