const StoreRepository = require('./../repository/StoreRepository');

exports.createStore = (req, res) => {
    const { name, address, postal_code, city, country, latitude, longitude, phone_num, user_id } = req.body;
    const storeData = { name, address, postal_code, city, country, latitude, longitude, phone_num, user_id };
    console.log(storeData);
    StoreRepository.createStore(storeData).then(result => {
        res.json({ msg: "Success", data: "The data created successfully" });
    }).catch(err => {
        res.status(500).json({ msg: "Error creating the store" });
    });
}

exports.getStoreByUserId = (req, res) => {
    const { userId } = req.body;
    StoreRepository.getStoreByUserId(userId).then(result => {
        if (result == undefined) {
            res.json({ msg: "There is no store associated to the user" })
        } else {
            res.json({ msg: "success", data: result });
        }

    }).catch(err => {
        res.status({ msg: "Error in retrieving data" });
    })
}