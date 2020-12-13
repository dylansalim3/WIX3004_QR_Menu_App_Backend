const Notification = require('../models/Notification');

/**
 * Create new notification
 * @param {Object} data
 * @param {string} data.title
 * @param {string} data.body
 * @param {number} data.user_id
 */
exports.newNotification = data => {
    return Notification.create(data);
}

/**
 * Get all notification for a user
 * @param {number} id Receiver uid
 * @returns {Promise<Notification[]>}
 */
exports.getAllNotification = id => {
    return Notification.findAll({
        where: {user_id: id},
        order: [['created', 'DESC']]
    })
}

/**
 * Set notification as read
 * @param {number} id Notification id
 */
exports.readNotification = id => {
    return Notification.findOne({where: {id: id}})
        .then(notification => {
            notification.isRead = true;
            return notification.save();
        })
}

/**
 * Delete notification by id
 * @param {number} id Notification id
 */
exports.deleteNotification = id => {
    return Notification.destroy({where: {id: id}})
}

/**
 * Delete all notifications for a user
 * @param {number} user_id Receiver user id
 */
exports.deleteAllNotifications = user_id => {
    return Notification.destroy({where: {receiver: user_id}})
}
