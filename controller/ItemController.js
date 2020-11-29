const ItemRepository = require('./../repository/ItemRepository');
const ItemCategoryRepository = require('./../repository/ItemCategoryRepository');

exports.createItem = (req, res) => {
  const file = req.file;
  const { item_category_id, name, desc, price, promo_price, hidden, recommended } = req.body;

  const itemData = {
    item_category_id,
    name,
    desc,
    price,
    promo_price,
    hidden,
    recommended
  };

  ItemRepository.createItem(itemData).then(result => {
    res.json({ msg: "success", data: result });
  }).catch(err => {
    res.status(500).json({ msg: "Error in creating the item" });
  });
}

exports.getAllItemByStoreId = (req, res) => {
  const { storeId } = req.body;
  ItemCategoryRepository.getAllItems(storeId).then(result => {
    res.json({ msg: "success", data: result });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: "Error in getting items" });
  })
}

exports.getItemByPk = (req, res) => {
  const { userId } = req.body;
  ItemRepository.getItemByPk(userId).then(result => {
    res.json({ msg: "success", data: result });
  }).catch(err => {
    res.status(500).json({ msg: "Error in getting user id" });
  })
}

exports.updateRecommendedStatus = (req, res) => {
  const { userId, recommended } = req.body;
  ItemRepository.setRecommendedStatus(userId, recommended).then(result => {
    res.json({ msg: "success", data: result });
  }).catch(err => {
    res.status(500).json({ msg: "Error in updating the recommended status" });
  })
}

exports.updateHiddenStatus = (req, res) => {
  const { userId, hidden } = req.body;
  ItemRepository.setHiddenStatus(userId, hidden).then(result => {
    res.json({ msg: "success", data: result });
  }).catch(err => {
    res.status(500).json({ msg: "Error in updating the hidden status" });
  })
}
