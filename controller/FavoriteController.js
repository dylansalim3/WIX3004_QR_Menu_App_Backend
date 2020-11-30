const FavoriteController = require("../repository/FavoriteRepository");
const StoreRepository = require("../repository/StoreRepository");

exports.favoriteList = (req, res) => {
    const { userId } = req.query;
    FavoriteController.getFavoriteByUserId(userId).then(async res2 => {
        let v = res2;
        let storeInfo = [];
        for(let i = 0; i < v.length; i++) {
            let vi = v[i].dataValues;
            let res3 = await StoreRepository.getAllStoreByUserId(vi.merchant_id);
            storeInfo.push(...res3);
        }

        res.json({ msg: "success", data: storeInfo });
    });
}

