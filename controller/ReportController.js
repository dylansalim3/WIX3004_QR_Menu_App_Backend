const Repo = require('../repository/ReportRepository');
const jwt = require("jsonwebtoken");
const {REPORTS} = require("../constant/route-constant");
const {PROCESS_REPORT} = require("../constant/route-constant");
const {getReportUserId} = require("../repository/ReportRepository");
const {getStoreByPk} = require("../repository/StoreRepository");
const {newNotification} = require("../controller/NotificationController");
const {banStore} = require('../repository/StoreRepository');
const {sendReportEmail} = require('../utils/emailUtils');

/**
 * @param {string} req.body.title
 * @param {string} req.body.desc
 * @param {string} req.body.email
 * @param {number} req.body.store_id
 * @returns {Promise<void>}
 */
exports.submitReport = async (req, res) => {
    try {
        const report = await Repo.newReport({
            title: req.body.title,
            desc: req.body.desc,
            email: req.body.email,
            store_id: req.body.store_id,
            user_id: req.token.id
        });
        await newNotification(
            [req.token.id],
            "Report: " + req.body.title,
            "We have received your report and will reviewed it shortly"
        );
        await sendReportEmail({
            username: req.token.first_name + req.token.last_name,
            title: req.body.title,
            reason: req.body.desc,
            acceptLink: getAcceptLink(report.dataValues.id, req.body.store_id, req.headers.host)
        });
        console.warn(getAcceptLink(report.dataValues.id, req.body.store_id, req.headers.host));
        res.status(200).json({msg: "report submitted"});
    } catch (err) {
        console.error(err);
        res.status(500).json({err: err});
    }

    // create an accept report link with signed jwt token
    function getAcceptLink(report_id, store_id, host) {
        host = host.replace('10.0.2.2', 'localhost');
        const token = jwt.sign({report_id, store_id}, process.env.SECRET_KEY);
        return "https://" + host + REPORTS + PROCESS_REPORT + '/' + token;
    }
}

/**
 * @param {number} req.params.token
 * @returns {Promise<void>}
 */
exports.processReport = async (req, res) => {
    //verify token
    if (!req.params.token) {
        console.error("params missing");
        return res.status(401).send();
    }
    const token = await jwt.verify(req.params.token, process.env.SECRET_KEY, (err, tokenData) => {
        if (err) {
            console.error("verify token error -> " + err);
            return res.status(401).send();
        }
        return tokenData;
    })
    //get token data
    const reportId = token.report_id;
    const storeId = token.store_id;
    if (!reportId || !storeId) return res.status(400).send();

    try {
        let prom = await Repo.acceptReport(reportId);
        if (prom === 'processed') {
            return res.status(400).send("report had been accepted before");
        }
        await banStore(storeId);
        await reportNotification("accepted", await getReportUserId(reportId));
        res.status(200).send("report accepted");
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }

    async function reportNotification(type, userId) {
        const store = await getStoreByPk(storeId)
            .catch(console.error);
        return newNotification(
            [userId],
            "Report: " + store.dataValues.name,
            "Your report is " + type
        ).catch(console.error);
    }
}
