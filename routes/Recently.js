const express = require('express');
const recently = express.Router();
const { RECENTLY_STORE_LIST} = require('./../constant/route-constant');
const Mutler = require("../utils/mutler.util");

const RecentlyController = require("../controller/RecentlyController");
recently.get(RECENTLY_STORE_LIST, RecentlyController.recentStoreList);
module.exports = recently;
