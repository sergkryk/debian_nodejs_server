const express = require("express");
const router = express.Router();

const controller = require("../controllers/login");

router.get("/", controller.verify);
router.post("/", controller.auth);

module.exports = router;
