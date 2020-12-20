const express = require("express");
const reports = express.Router();
const { SUBMIT_REPORT, PROCESS_REPORT } = require('../constant/route-constant');
const controller = require('../controller/ReportController');
const {verifyToken} = require("../utils/verify.util");

reports.post(SUBMIT_REPORT, verifyToken, controller.submitReport);
reports.get(PROCESS_REPORT + '/:token', controller.processReport);

module.exports = reports;
