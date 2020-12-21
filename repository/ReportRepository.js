const Report = require('../models/Report');
const {REPORT_STATUS} = require('../constant/constant');
const {sequelize} = require('../database/db');

/**
 * @param {Object} data
 * @param {string} data.title
 * @param {string} data.desc
 * @param {string} data.title
 * @param {number} data.user_id
 * @param {number} data.store_id
 * @param {string} data.email
 */
exports.newReport = (data) => {
    return Report.create(data);
}

/**
 * @param {number} id
 */
exports.acceptReport = (id) => {
    return Report.findOne({where: {id: id}})
        .then(report => {
            if (!report || report.processedDate) {
                return "processed";
            }
            report.status = REPORT_STATUS.ACCEPTED;
            report.processedDate = sequelize.literal("CURRENT_TIMESTAMP");
            return report.save();
        })
}

exports.getReportUserId = async (reportId) => {
    return Report.findOne({where: {id: reportId}})
        .then(report => report.user_id)
}
