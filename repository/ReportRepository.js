const Report = require('../models/Report');
const {REPORT_STATUS} = require('../constant/constant');
const {Sequelize} = require('../database/db');

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
            if (report.processed_date) {
                return "processed";
            }
            report.status = REPORT_STATUS.ACCEPTED;
            report.processed_date = Sequelize.fn('now');
            return report.save();
        })
}

/**
 * @param {number} id
 */
exports.rejectReport = (id) => {
    return Report.findOne({where: {id: id}})
        .then(report => {
            if (report.processed_date) {
                return "processed";
            }
            report.status = REPORT_STATUS.REJECTED;
            report.processed_date = Sequelize.fn('now');
            return report.save();
        })
}
