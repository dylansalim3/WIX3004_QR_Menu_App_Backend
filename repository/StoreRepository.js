const Store = require('./../models/Store');

exports.createStore = (storeData, arguments) => {
    return Store.create(storeData, arguments);
}

exports.getStoreByUserId = (userId) => {
    return Store.findOne({ where: { user_id: userId } });
}

exports.getStoreByPk = (pk) => {
    return Store.findByPk(pk);
}