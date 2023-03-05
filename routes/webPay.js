const express = require("express");
const router = express.Router();
const path = require("path");

const controller = require("../controllers/webPay");

router.get("/:account([0-9]{4})", controller.pay);

router.get("/", controller.check);

module.exports = router;
