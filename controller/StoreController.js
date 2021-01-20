const StoreRepository = require('./../repository/StoreRepository');
const UserRepository = require('./../repository/UserRepository');
const RoleRepository = require('./../repository/RoleRepository');
const { MERCHANT } = require('./../constant/constant');
const jwt = require('jsonwebtoken');
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
        return UserRepository.findUserById(user_id)
        .then(async (user) => {
            const token = await signToken(user);
            res.json({ msg: "Success", data: {token} });
        })
    }).catch(err => {
        console.log(err.toString());
        res.status(500).json({ msg: "Error creating the store" });
    });
}

const signToken = async (user) => {
    const mydata = JSON.parse(JSON.stringify(user));
    const role = await RoleRepository.findRoleById(user.role_id);

    mydata['role'] = role.name;

    if (role.name === MERCHANT) {
        const store = await StoreRepository.getStoreByUserId(mydata.id);
        if (store && store.id) {
            mydata['store_id'] = store.id;
            mydata['store_name'] = store.name;
        }
    }
    return jwt.sign(mydata, process.env.SECRET_KEY);
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
    const storeData = {
        name,
        address,
        postal_code,
        city,
        country,
        phone_num,
        user_id,
        open_hour,
        closing_hour,
        special_opening_note
    };
    if (file !== undefined) {
        filePath = file.path.replace(/\\/g, "/");
        storeData['profile_img'] = filePath;
    }

    if (latitude != 0) {
        console.log("latitude print "+latitude, longitude)
        storeData['latitude'] = latitude;
        storeData['longitude'] = longitude;
    }



    StoreRepository.updateStore(storeData, id).then(result => {
        res.json({ msg: "The data created successfully", data: result });
    }).catch(err => {
        console.log(err.toString());
        res.status(500).json({ msg: "Error creating the store" });
    });
}