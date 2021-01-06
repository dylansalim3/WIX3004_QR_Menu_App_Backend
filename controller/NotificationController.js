const Repo = require('../repository/NotificationRepository');
const UserRepo = require('../repository/UserRepository');
const {REPORT_STATUS} = require("../constant/constant");
const {sendFcmNotification} = require('../utils/notification.util');

/**
 * @param {number[]} receivers
 * @param {string} title
 * @param {string} body
 * @param {string} [activity]
 * @param {int} [data]
 * @returns {Promise<void>}
 */
exports.newNotification = async (receivers, title, body, activity, data) => {
    const promises = receivers.map(async (receiver) => {
        await Repo.createNotification({title, body, user_id: receiver});
        return UserRepo.getFCM(receiver);
    })
    const fcmTokens = await Promise.all(promises)
        .catch(console.error);
    return sendFcmNotification(fcmTokens.filter(token => token !== null)
        , {body, title, activity, data})
        .catch(console.error);
}

/**
 * @returns {Promise<void>}
 */
exports.getAllNotifications = async (req, res) => {
    const userId = req.token.id;
    try {
        const notifications = await Repo.getAllNotification(userId);
        res.json(notifications);
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
        res.json({msg: "Notification read"});
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
        res.json({msg: "All notifications deleted"})
    } catch (e) {
        console.error(e);
        res.status(500).json({err: e})
    }
}

/**
 * @param {number[]} userIds
 * @param {string} storeName
 * @param {number} storeId
 * @returns {Promise<void>}
 */
exports.storeNotification = async (userIds, storeName, storeId) => {
    const title = `Store ${storeName} has updated new item`;
    const body = `Please check out Store ${storeName}`;
    return exports.newNotification(userIds, title, body, "store", storeId);
}

/**
 * A welcome notification for new user
 * @param {number} userId
 * @returns {Promise<void>}
 */
exports.newUserNotification = async (userId) => {
    const title = "Thanks for signing up at QRMenuApp";
    const body = "You can now add your frequently visited stores as favourite";
    return exports.newNotification([userId], title, body);
}

/**
 * @param {number} userId
 * @param {string} storeName
 * @param {string} type
 * @returns {Promise<void>}
 */
exports.reportNotification = async (userId, storeName, type) => {
    const title = "Report for " + storeName;
    const body = type === REPORT_STATUS.PENDING
        ? "We received your report and will reviewed it shortly"
        : "We have accepted your report"
    return exports.newNotification([userId], title, body);
}