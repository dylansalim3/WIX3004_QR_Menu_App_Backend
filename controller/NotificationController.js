const Repo = require('../repository/NotificationRepository');
const UserRepo = require('../repository/UserRepository');
const {sendFcmNotification} = require('../utils/notification.util');

/**
 * @param {number[]} receivers
 * @param {string} title
 * @param {string} body
 * @returns {Promise<void>}
 */
exports.newNotification = async (receivers, title, body) => {
    const promises = receivers.map(async (receiver) => {
        await Repo.newNotification({title, body, receiver});
        return UserRepo.getFCM(receiver);
    })
    const fcmTokens = await Promise.all(promises)
        .catch(console.error);
    return sendFcmNotification(fcmTokens, {body, title})
        .catch(console.error);
}

exports.getAllNotifications = async (req, res) => {
    const {id} = req.params;
    try {
        const notifications = await Repo.getAllNotification(id);
        res.status(200).json(notifications);
    } catch (e) {
        console.error(e);
        res.status(500).json({err: e});
    }
}

exports.readNotification = async (req, res) => {
    const id = req.body.id;
    try {
        await Repo.readNotification(id);
        res.status(200).json({msg: "Notification read"})
    } catch (e) {
        console.error(e);
        res.status(500).json({err: e})
    }
}

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

exports.deleteAllNotifications = async (req, res) => {
    const id = req.body.id;
    try {
        await Repo.deleteAllNotifications(id);
        res.status(200).json({msg: "All notifications deleted"})
    } catch (e) {
        console.error(e);
        res.status(500).json({err: e})
    }
}
