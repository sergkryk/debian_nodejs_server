const express = require("express");
const router = express.Router();

const controller = require("../controllers/psb_report");
const verifyReportReq = require("../middleware/reportReqVerification.js");

router.use(verifyReportReq);

router.get("/", controller);

module.exports = router;
