const StoreRepository = require('./../repository/StoreRepository');
const path = require('path');
var Qrcode = require('qrcode');

exports.createStore = (req, res) => {
    const { name, address, postal_code, city, country, latitude, longitude, phone_num, user_id, open_hour, closing_hour, special_opening_note } = req.body;
    const file = req.file;
    let filePath = null;
    if (file !== undefined) {
        filePath = file.path.replace(/\\/g, "/");
    }
    const storeData = { 
        name, 
        address, 
        postal_code, 
        city, 
        country, 
        latitude, 
        longitude, 
        phone_num, 
        user_id, 
        open_hour, 
        closing_hour, 
        special_opening_note, 
        profile_img: filePath };


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

exports.getStoreByPk = (req, res) => {
    const { storeId } = req.body;
    StoreRepository.getStoreByPk(storeId).then(result => {
        if (result == undefined) {
            res.status(404).json({ msg: "Store not found" });
        } else {
            res.json({ msg: "success", data: result });
        }
    }).catch(err => {
        res.status({ msg: "Error in retrieving data" });
    })
}

exports.getGeneratedQrCode = (req, res) => {
    const { storeId } = req.body;
    StoreRepository.getStoreByPk(storeId).then((result) => {
        if (result == undefined) {
            res.json({ msg: "There is no storeID" });
        } else {
            const dataString = `
            {
                "storeId":${storeId}
            }
            `
            Qrcode.toDataURL(dataString, { errorCorrectionLevel: 'H' }, function (err, url) {
                res.json({ msg: "success", data: url });
            });
        }
    }).catch(err => {
        res.json({ msg: err.toString() });
    })
}

exports.updateStore = (req, res) => {
    const { id, name, address, postal_code, city, country, latitude, longitude, phone_num, user_id, open_hour, closing_hour, special_opening_note } = req.body;
    const file = req.file;
    let filePath = null;
    if (file !== undefined) {
        filePath = file.path.replace(/\\/g, "/");
    }
    const storeData = {
        name,
        address,
        postal_code,
        city,
        country,
        latitude,
        longitude,
        phone_num,
        user_id,
        open_hour,
        closing_hour,
        special_opening_note,
        profile_img: filePath
    };

    StoreRepository.updateStore(storeData, id).then(result => {
        res.json({ msg: "The data created successfully", data: result });
    }).catch(err => {
        console.log(err.toString());
        res.status(500).json({ msg: "Error creating the store" });
    });
}