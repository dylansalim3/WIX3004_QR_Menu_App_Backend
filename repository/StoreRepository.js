const Store = require('./../models/Store');

exports.createStore = (storeData, arguments) => {
    return Store.create(storeData, arguments);
}

exports.getStoreByUserId = (userId) => {
    return Store.findOne({ where: { userId } });
}


exports.getAllStoreByUserId = (userId) => {
    return Store.findAll({ where: { userId } });
}

