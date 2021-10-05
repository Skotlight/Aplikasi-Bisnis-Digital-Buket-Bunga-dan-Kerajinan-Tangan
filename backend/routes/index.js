const express = require("express");
const router = express.Router();

const userRoutes = require("./user_routes");
const handcraftRoutes = require("./handcraft_routes");
const productRoutes = require("./product_routes");
const cartRoutes = require("./cart_routes");
const transactionRoutes = require("./transaction_routes");
const historyRoutes = require("./history_routes");

const auth = require("../middlewares/authentication");

router.use("/", userRoutes);
router.use("/handcraft", handcraftRoutes);
router.use("/products", productRoutes);
router.use("./carts", auth, cartRoutes);
router.use("./transaction", auth, transactionRoutes);
router.use("./histories", auth, historyRoutes);

module.exports = router;
