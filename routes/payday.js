const express = require("express");
const router = express.Router();

const controller = require("../controllers/payday");
const verifyReportReq = require("../middleware/paydayVerification.js");

router.use(verifyReportReq);

router.get("/", controller);

module.exports = router;
