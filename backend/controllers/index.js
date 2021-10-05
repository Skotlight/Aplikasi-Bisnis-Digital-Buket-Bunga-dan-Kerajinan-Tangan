const user = require("./user_controller");
const product = require("./product_controller");
const cart = require("./cart_controller");
const transaction = require("./transaction_controller");
const history = require("./history_controller");
const handcraft = require("./handcraft_controller");

module.exports = { user, product, cart, transaction, history, handcraft };