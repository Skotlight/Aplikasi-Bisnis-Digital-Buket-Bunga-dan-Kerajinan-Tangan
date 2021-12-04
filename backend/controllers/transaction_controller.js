const { Transaction } = require("../models");

module.exports = class transactionController {
  static fetchAll(req, res, next) {
    let userId = req.currentUser.id;
    let { id } = req.params;
    Transaction.findAll({ where: { userId, historyId: id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static create(req, res, next) {
    let userId = +req.currentUser.id;
    let { productName, quantity, tot_price, historyId } = req.body;
    let newData = { userId, productName, quantity, tot_price, historyId };
    Transaction.create(newData)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }
};
