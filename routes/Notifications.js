const express = require("express");
const notifications = express.Router();
const {GET_ALL_NOTIFICATIONS, DELETE_ALL_NOTIFICATIONS, DELETE_NOTIFICATION, READ_NOTIFICATION} = require('../constant/route-constant');
const controller = require('../controller/NotificationController');
const {verifyToken} = require("../utils/verify.util");

notifications.post(GET_ALL_NOTIFICATIONS, verifyToken, controller.getAllNotifications);
notifications.post(READ_NOTIFICATION, verifyToken, controller.readNotification);
notifications.post(DELETE_ALL_NOTIFICATIONS, verifyToken, controller.deleteAllNotifications);

module.exports = notifications;
