const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");
// const verifyReportReq = require("../middleware/paydayVerification.js");
// const setProvider = require("../middleware/providerId.js");

// router.use(verifyReportReq);
// router.use(setProvider.psb);

router.post("/", controller.auth);

module.exports = router;
