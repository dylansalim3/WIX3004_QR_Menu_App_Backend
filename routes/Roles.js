const express = require('express');
const roles = express.Router();
const Role = require('../models/Role');
const RoleController = require("../controller/RoleController");

roles.get('/get-all-roles', RoleController.getAllRoles);

module.exports = roles;