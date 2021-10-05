const express = require("express");
const router = express.Router();
const { history } = require("../controllers");

router.get("/", history.fetchAll);
router.post("/", history.create);

module.exports = router;