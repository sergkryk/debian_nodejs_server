const express = require("express");
const router = express.Router();
// const path = require("path");

const controller = require("../controllers/webPay");
const tokenVerification = require("../middleware/tokenVerification");

router.use(tokenVerification);

router.get("/", controller.check);
router.post("/", controller.pay);

module.exports = router;
