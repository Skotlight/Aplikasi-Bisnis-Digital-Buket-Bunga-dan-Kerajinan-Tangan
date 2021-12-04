const express = require("express");
const router = express.Router();
const { category } = require("../controllers");

router.get("/", category.fetchAll);
router.get("/:id", category.fetch);
router.post("/", category.create);
router.put("/:id", category.update);
router.patch("/:id", category.patch);
router.delete("/:id", category.delete);

module.exports = router;
