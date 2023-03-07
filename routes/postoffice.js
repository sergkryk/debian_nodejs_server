const express = require("express");
const router = express.Router();

const controller = require("../controllers/citypay");
const reqVerification = require("../middleware/citypayVerification.js");
const setProvider = require("../middleware/providerId.js")

router.use(reqVerification);
router.use(setProvider.post);

router.get("/", controller);

module.exports = router;
