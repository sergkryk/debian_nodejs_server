const express = require("express");
const router = express.Router();

const controller = require("../controllers/psb");
const reqVerification = require("../middleware/reqVerification.js");
const setProvider = require("../middleware/addProviderId.js")

router.use(reqVerification);

router.use(setProvider.dealer);

router.get("/", controller);

module.exports = router;
