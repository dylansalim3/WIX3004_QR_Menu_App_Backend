const express = require('express');
const roles = express.Router();
const RoleController = require("../controller/RoleController");
const {GET_ALL_ROLES} = require('./../constant/route-constant');

roles.get(GET_ALL_ROLES, RoleController.getAllRoles);

module.exports = roles;