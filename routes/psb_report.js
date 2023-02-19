const express = require("express");
const router = express.Router();

const controller = require("../controllers/psb_report");
// const reqVerification = require("../middleware/reqVerification.js");

// router.use(reqVerification);

router.get("/", controller);

module.exports = router;
