const Store = require('./../models/Store');
const dayjs = require('dayjs');

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
    return Store.findOne({where: {id: storeId}})
        .then(store => {
            store.ban_until = dayjs().add(1, 'week').format('YYYY-MM-DD');
            return store.save();
        })
}
