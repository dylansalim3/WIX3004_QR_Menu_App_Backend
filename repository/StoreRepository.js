const Store = require('./../models/Store');
const dayjs = require('dayjs');
const fs = require('fs');

exports.createStore = (storeData, arguments) => {
    return Store.create(storeData, arguments);
}

exports.getStoreByUserId = (userId) => {
    return Store.findOne({ where: { user_id: userId } });
}

exports.getStoreByPk = (pk) => {
    return Store.findByPk(pk);
}

exports.banStore = (storeId) => {
    return Store.findOne({ where: { id: storeId } })
        .then(store => {
            store.ban_until = dayjs().add(1, 'week').format('YYYY-MM-DD');
            return store.save();
        })
}

exports.updateStore = (storeData, pk) => {
    return Store.findByPk(pk).then(store => {
        try {
            fs.unlinkSync(store.profile_img);
        } catch (err) {

        }
        if (storeData.profile_img !== undefined) {
            store.profile_img = storeData.profile_img;
        }

        if (storeData.latitude != 0) {
            store.latitude = storeData.latitude;
            store.longitude = storeData.longitude;
        }

        store.name = storeData.name;
        store.address = storeData.address;
        store.postal_code = storeData.postal_code;
        store.city = storeData.city;
        store.country = storeData.country;

        store.phone_num = storeData.phone_num;
        store.user_id = storeData.user_id;
        store.open_hour = storeData.open_hour;
        store.closing_hour = storeData.closing_hour;
        store.special_opening_note = storeData.special_opening_note;
        store.save();
        return store;
    });
}