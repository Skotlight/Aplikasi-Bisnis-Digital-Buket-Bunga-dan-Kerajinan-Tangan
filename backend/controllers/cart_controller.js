const { Cart, Product } = require("../models");

module.exports = class cartController {
  static fetchAll(req, res, next) {
    Cart.findAll({
      where: { userId: req.currentUser.id },
      include: ["Product"],
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }
  static add(req, res, next) {
    let userId = +req.currentUser.id;
    let { productId, quantity } = req.body;
    let newData = { userId, productId, quantity };
    let productPrice;
    let stock;
    Product.findByPk(+productId)
      .then((data) => {
        stock = data.stock;
        productPrice = data.price;
        return Cart.findOne({ where: { userId, productId } });
      })
      .then((data) => {
        if (data) {
          if (stock >= quantity + data.quantity) {
            let totquantity = quantity + data.quantity;
            let totPrice = productPrice * totquantity;
            let updatedData = {
              quantity: totquantity,
              price: totPrice,
            };
            return Cart.update(updatedData, { where: { userId, productId } });
          } else {
            throw new Error("Quantity Max");
          }
        } else {
          newData["price"] = productPrice * quantity;
          return Cart.create(newData);
        }
      })
      .then(() => {
        res
          .status(201)
          .json({ message: "Product succesfully added to your cart" });
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }
  static update(req, res, next) {
    let id = req.params.cartId;
    let { quantity } = req.body;
    Cart.findByPk(id)
      .then((data) => {
        return Product.findByPk(data.productId);
      })
      .then((data) => {
        let Price = data.price * quantity;
        if (data.stock >= quantity) {
          return Cart.update({ quantity, Price }, { where: { id } });
        } else {
          throw new Error("QuantityMax");
        }
      })
      .then(() => {
        res.status(201).json({ message: "Product quantity changed" });
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static delete(req, res, next) {
    let id = req.params.cartId;
    Cart.destroy({ where: { id } })
      .then(() => {
        res.status(201).json({ message: "Product removes from cart" });
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }
};
