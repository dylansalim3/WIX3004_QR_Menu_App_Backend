const ItemCategoryRepository = require('./../repository/ItemCategoryRepository');

exports.createItemCategory = async (req, res) => {
    const { name, store_id } = req.body;
    try {
        let currentMaxPosition = await ItemCategoryRepository.getCurrentPositionByStoreId(store_id);
        currentMaxPosition = currentMaxPosition === undefined ? 0 : currentMaxPosition;
        const itemCategoryData = { name, store_id, position: currentMaxPosition };

        ItemCategoryRepository.createItemCategory(itemCategoryData).then(result => {
            res.json({ msg: "success", data: result });
        });
    } catch (err) {
        res.status(500).json({ msg: "Error in creating item" });
    }
}

exports.getCurrentPositionByStoreId = (req, res) => {
    const { store_id } = req.body;
    ItemCategoryRepository.getCurrentPositionByStoreId(store_id).then(result => {
        res.json({ msg: "success", data: result });
    }).catch(err => {
        res.status(500).json({ msg: "Error in getting position" });
    })
}

exports.deleteItemCategory = (req, res) => {
    const { item_category_id } = req.body;
    ItemCategoryRepository.deleteItemCategory(item_category_id).then(result => {
        res.json({ msg: "Item Category deleted" });
    }).catch(err=>{
        res.status(500).json({ msg: "Error in deleting item category" });
    })
}
