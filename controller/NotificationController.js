const Repo = require('../repository/NotificationRepository');
const UserRepo = require('../repository/UserRepository');
const {sendFcmNotification} = require('../utils/notification.util');

/**
 * @param {number[]} receivers
 * @param {string} title
 * @param {string} body
 * @param {string} activity
 * @param {int} data
 * @returns {Promise<void>}
 */
exports.newNotification = async (receivers, title, body, activity, data) => {
    const promises = receivers.map(async (receiver) => {
        await Repo.createNotification({title, body, user_id: receiver});
        return UserRepo.getFCM(receiver);
    })
    const fcmTokens = await Promise.all(promises)
        .catch(console.error);
    return sendFcmNotification(fcmTokens, {body, title, activity, data})
        .catch(console.error);
}

/**
 * @returns {Promise<void>}
 */
exports.getAllNotifications = async (req, res) => {
    const userId = req.token.id;
    try {
        const notifications = await Repo.getAllNotification(userId);
        res.status(200).json(notifications);
    } catch (e) {
        console.error(e);
        res.status(500).json({err: e});
    }
}

/**
 * @param {number} req.body.id Notification id
 * @returns {Promise<void>}
 */
exports.readNotification = async (req, res) => {
    const id = req.body.id;
    try {
        await Repo.readNotification(id);
        res.status(200).json({msg: "Notification read"});
    } catch (e) {
        console.error(e);
        res.status(500).json({err: e});
    }
}

/**
 * @param {number} req.body.id Notification id
 * @returns {Promise<void>}
 */
exports.deleteNotification = async (req, res) => {
    const id = req.body.id;
    try {
        await Repo.deleteNotification(id);
        res.status(200).json({msg: "Notification delete"})
    } catch (e) {
        console.error(e);
        res.status(500).json({err: e});
    }
}

/**
 * @returns {Promise<void>}
 */
exports.deleteAllNotifications = async (req, res) => {
    const userId = req.token.id;
    try {
        await Repo.deleteAllNotifications(userId);
        res.status(200).json({msg: "All notifications deleted"})
    } catch (e) {
        console.error(e);
        res.status(500).json({err: e})
    }
}

/**
 * A welcome notification for new user
 * @param {number} userId
 * @returns {Promise<void>}
 */
exports.newUserNotification = async (userId) => {
    const title = "Thanks for signing up at QRMenuApp"
    const body = "You can add your frequently visited stores as favourite"
    return createNotification([userId], title, body);
}