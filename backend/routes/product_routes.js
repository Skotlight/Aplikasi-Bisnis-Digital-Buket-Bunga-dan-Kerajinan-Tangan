const express = require("express");
const router = express.Router();
const { product } = require("../controllers");
const auth = require("../middlewares/authorization");
const authen = require("../middlewares/authentication");

router.get("/", product.fetchAll);
router.get("/:id", product.fetch);
router.post("/", product.create);
router.put("/:id", product.update);
router.patch("/:id", product.patch);
router.delete("/:id", product.delete);
router.post("/search", product.search);

module.exports = router;
