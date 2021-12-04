const express = require("express");
const router = express.Router();
const { xendit } = require("../controllers");

router.post("/createInvoice", xendit.createInvoice);

module.exports = router;
