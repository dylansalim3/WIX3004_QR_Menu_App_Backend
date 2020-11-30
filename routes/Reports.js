const express = require("express");
const reports = express.Router();
const { SUBMIT_REPORT, PROCESS_REPORT } = require('../constant/route-constant');
const controller = require('../controller/ReportController');

reports.post(SUBMIT_REPORT, controller.submitReport);
reports.post(PROCESS_REPORT, controller.processReport);

module.exports = reports;
