const express = require("express");
const router = express.Router();
const { cart } = require("../controllers");
const auth = require("../middlewares/authorization");

router.get("/:userId", cart.fetchAll);
router.post("/:userId", cart.add);
router.patch("/:cartId", cart.update);
router.delete("/:cartId", cart.delete);

module.exports = router;
