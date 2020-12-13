const Repo = require('../repository/ReportRepository');
const {newNotification} = require("../repository/NotificationRepository");
const {banStore} = require('../repository/StoreRepository');

/**
 * @param {string} req.body.title
 * @param {string} req.body.desc
 * @param {string} req.body.email
 * @param {number} req.body.store_id
 * @param {number} req.body.user_id
 * @returns {Promise<void>}
 */
exports.submitReport = async (req, res) => {
    try {
        await Repo.newReport({
            title: req.body.title,
            desc: req.body.desc,
            email: req.body.email,
            store_id: req.body.store_id,
            user_id: req.body.user_id
        });
        await newNotification({
            title: req.body.title,
            body: "Report submitted",
            receiver: req.body.user_id
        });
        res.status(200).json({msg: "report submitted"});
    } catch (err) {
        console.error(err);
        res.status(500).json({err: err});
    }
}

/**
 * @param {number} req.body.id
 * @param {number} req.body.store_id
 * @param {string} req.body.type
 * @returns {Promise<void>}
 */
exports.processReport = async (req, res) => {
    const reportId = req.body.id;
    const storeId = req.body.store_id;
    const type = req.body.type;

    if (!storeId) {
        res.status(400).json({err: "store id not provided"});
        return;
    }

    try {
        if (type === 'accept') {
            let prom = await Repo.acceptReport(reportId);
            if (prom === 'processed') {
                res.status(400).json({err: "report already processed"});
            }
            await banStore(storeId);
            res.status(200).json({msg: "report accepted"});
            return;
        }

        if (type === 'reject') {
            let prom = await Repo.rejectReport(reportId);
            if (prom === 'processed') {
                res.status(400).json({msg: "report already processed"});
            }
            res.status(200).json({err: "report rejected"});
            return;
        }

        console.error("unknown or empty type");
        res.status(400).json({err: "unknown or empty type"});

    } catch (err) {
        console.error(err);
        res.status(500).json({err: err});
    }
}
