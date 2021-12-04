const { Product, Handcraft, Category } = require("../models");
const { Op } = require("sequelize");

module.exports = class productController {
  static fetchAll(req, res, next) {
    Product.findAll({ include: Category })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static fetch(req, res, next) {
    let { id } = req.params;
    Product.findOne({ where: { id }, include: Category })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static create(req, res, next) {
    let { name, image_url, price, stock, category } = req.body;
    let newData = { name, image_url, price, stock, category };
    Product.create(newData)
      .then((data) => {
        let category = Category.findOne({ where: { id: category } });
        return { data, category };
      })
      .then((data) => {
        let result = {
          id: data.data.id,
          name: data.data.name,
          image_url: data.data.image_url,
          price: data.data.price,
          stock: data.data.stock,
          category: data.category.category,
        };
        res.status(201).json(result);
      })
      .catch((err) => {
        if (Array.isArray(err.errors)) {
          let errors = [];
          err.errors.forEach((el) => {
            errors.push(el.type);
          });
          next({ name: "Validations", message: errors });
        } else {
          next({ name: "InternalError", message: err.message });
        }
      });
  }

  static update(req, res, next) {
    let { name, image_url, price, stock, category } = req.body;
    let id = +req.params.id;
    let newData = { name, image_url, price, stock, category };
    Product.update(newData, {
      where: {
        id,
      },
    })
      .then(() => {
        res.status(201).json({ message: `Product ${name} Updated` });
      })
      .catch((err) => {
        if (Array.isArray(err.errors)) {
          let errors = [];
          err.errors.forEach((el) => {
            errors.push(el.type);
          });
          next({ name: "Validations", message: errors });
        } else {
          next({ name: "InternalError", message: err.message });
        }
      });
  }

  static delete(req, res, next) {
    let id = +req.params.id;
    Product.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: "Product Deleted" });
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static async patch(req, res, next) {
    let id = +req.params.id;
    let data = {};
    let product = await Product.findByPk(id);
    req.body.name
      ? (data["name"] = req.body.name)
      : (data["name"] = product.name);
    req.body.price
      ? (data["price"] = req.body.price)
      : (data["price"] = product.price);
    req.body.image_url
      ? (data["image_url"] = req.body.image_url)
      : (data["image_url"] = product.image_url);
    req.body.stock
      ? (data["stock"] = req.body.stock)
      : (data["stock"] = product.stock);
    req.body.category
      ? (data["category"] = req.body.category)
      : (data["category"] = product.category);
    Product.update(data, {
      where: {
        id,
      },
    })
      .then(() => {
        res.status(201).json({ message: `Product with ID ${id} Updated` });
      })
      .catch((err) => {
        res.status(500).json({ message: "tesw" });
        // next({ name: "InternalError", message: err.message });
      });
  }

  static async search(req, res, next) {
    const { search, category } = req.body;
    let products = [];
    // const query = { where: { name: { [Op.substring]: search } } };

    products = await Product.findAll({
      where: { category, name: { [Op.substring]: search } },
    });

    if (products === null) {
      res.status(500).json({ message: "No Products" });
    } else {
      res.status(200).json({ category, products });
    }
  }
};
