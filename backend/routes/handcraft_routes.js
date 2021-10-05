const express = require("express");
const router = express.Router();
const { handcraft } = require("../controllers");

router.get("/", handcraft.fetchAll);
router.get("/:id", handcraft.fetch);
router.post("/", handcraft.create);
router.put("/:id", handcraft.update);
router.patch("/:id", handcraft.patch);
router.delete("/:id", handcraft.delete);

module.exports = router;