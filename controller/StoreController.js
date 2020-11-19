const StoreRepository = require('./../repository/StoreRepository');

exports.createStore = (req, res) => {
    const { name, address, postalCode, city, country, latitude, longitude, phoneNum, userId } = req.body;
    const storeData = { name, address, postalCode, city, country, latitude, longitude, phoneNum, userId };
    StoreRepository.createStore(storeData).then(result => {
        res.send({ msg: "The store is created successfully" });
    })
}

exports.getStoreByUserId = (req, res) => {
    const { userId } = req.body;
    StoreRepository.getStoreByUserId(userId).then(result => {
        if (result == undefined) {
            res.json({ msg: "There is no store associated to the user" })
        } else {
            res.json({ msg: "success", data: result });
        }

    })
}