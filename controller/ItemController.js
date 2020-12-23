const ItemRepository = require('./../repository/ItemRepository');
const ItemCategoryRepository = require('./../repository/ItemCategoryRepository');
const UrlUtil = require('./../utils/url.util');

exports.createItem = (req, res) => {
  const file = req.file;
  const { item_category_id, name, desc, price, promo_price, hidden, recommended,currency } = req.body;
  console.log("req body");
  console.log(req.body);
  console.log(req.body.name);
  let filePath = null;
  if (file !== undefined) {
    filePath = file.path.replace(/\\/g, "/");
  }

  const itemData = {
    item_category_id,
    name,
    desc,
    price,
    promo_price,
    hidden,
    recommended,
    item_img: filePath,
    currency,
  };

  ItemRepository.createItem(itemData).then(result => {
    res.json({ msg: "success", data: result });
  }).catch(err => {
    res.status(500).json({ msg: "Error in creating the item" });
  });
}


exports.updateItem = (req, res) => {
  const file = req.file;
  const { id, name, desc, price, promo_price, hidden, recommended,currency } = req.body;
  let filePath = null;
  if (file !== undefined) {
    filePath = file.path.replace(/\\/g, "/");
  }

  const itemData = {
    name,
    desc,
    price,
    promo_price,
    hidden,
    recommended,
    item_img: filePath,
    currency,
  };

  ItemRepository.updateItem(itemData, id).then(result => {
    res.json({ msg: "success", data: result });
  }).catch(err => {
    res.status(500).json({ msg: "Error in updating item" });
  });
}

exports.getAllItemByStoreId = (req, res) => {
  const { storeId } = req.body;
  ItemCategoryRepository.getAllItems(storeId).then(allItems => {
    res.json({ msg: "success", data: allItems });
  }).catch(err => {
    res.status(500).json({ msg: "Error in getting items" });
  })
}

exports.getItemByPk = (req, res) => {
  const { itemId } = req.body;
  ItemRepository.getItemByPk(itemId).then(result => {
    // result.item_img = UrlUtil.mapUrl({ suffix: result.item_img, req });
    res.json({ msg: "success", data: result });
  }).catch(err => {
    res.status(500).json({ msg: "Error in getting user id" });
  })
}

exports.deleteItem = (req, res) => {
  const { item_id } = req.body;
  ItemRepository.deleteItem(item_id).then(result => {
    res.json({ msg: "Item deleted" });
  }).catch(err => {
    res.status(500).json({ msg: "Error in deleting the item" });
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
