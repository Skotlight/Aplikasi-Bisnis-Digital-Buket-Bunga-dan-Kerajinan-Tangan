const { History, Transaction } = require("../models");

module.exports = class historyController {
    static fetchAll(req, res, next) {
        let userId = +req.currentuser.id;
        History.findAll({ where: { userId }, include: {Transaction} })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next ({ name: "InternalError", message: err.message });
        });
    }

    static create(req, res, next) {
        let userId = +req.currentuser.id;
        let { totalPrice } = req.body;
        let newData = { userId, totalPrice };
        History.create(newData)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            next({ name: "InternalError", message: err.message});
        });
    }
};