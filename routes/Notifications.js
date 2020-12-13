const express = require("express");
const notifications = express.Router();
const {GET_ALL_NOTIFICATIONS, DELETE_ALL_NOTIFICATIONS, DELETE_NOTIFICATION, READ_NOTIFICATION} = require('../constant/route-constant');
const controller = require('../controller/NotificationController');

notifications.post(GET_ALL_NOTIFICATIONS, controller.getAllNotifications);
notifications.post(READ_NOTIFICATION, controller.readNotification);
notifications.post(DELETE_NOTIFICATION, controller.deleteNotification);
notifications.post(DELETE_ALL_NOTIFICATIONS, controller.deleteAllNotifications);

module.exports = notifications;
