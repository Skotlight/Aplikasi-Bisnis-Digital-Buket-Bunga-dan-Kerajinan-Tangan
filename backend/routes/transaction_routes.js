const express = require("express");
const router = express.Router();
const { transaction } = require("../controllers");

router.get("/:id", transaction.fetchAll);
router.post("/", transaction.create);

module.exports = router;