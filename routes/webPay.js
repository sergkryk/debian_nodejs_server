const express = require("express");
const router = express.Router();
const path = require("path");

const controller = require("../controllers/webPay");

router.post("/", controller.pay);
router.get("/", controller.check);

module.exports = router;
