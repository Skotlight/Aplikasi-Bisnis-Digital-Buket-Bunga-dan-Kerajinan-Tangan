const { Handcraft } = require("../models");

module.exports = class productController {
  static fetchAll(req, res, next) {
    Handcraft.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static fetch(req, res, next) {
    let { id } = req.params;
    Handcraft.findByPk(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static create(req, res, next) {
    let { name, image_url, price, stock } = req.body;
    let newData = { name, image_url, price, stock };
    Handcraft.create(newData)
      .then((data) => {
        let result = {
          id: data.id,
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          stock: data.stock,
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
    let { name, image_url, price, stock } = req.body;
    let id = +req.params.id;
    let newData = { name, image_url, price, stock };
    Handcraft.update(newData, {
      where: {
        id,
      },
    })
      .then(() => {
        res.status(201).json({ message: `Handcraft ${name} Updated` });
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
    Handcraft.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: "Handcraft Deleted" });
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static patch(req, res, next) {
    let id = +req.params.id;
    let data = {};
    req.body.name ? (data["name"] = req.body.name) : "";
    req.body.price ? (data["price"] = req.body.price) : "";
    req.body.image_url ? (data["image_url"] = req.body.image_url) : "";
    req.body.stock ? (data["stock"] = req.body.stock) : "";
    Handcraft.update(data, {
      where: {
        id,
      },
    })
      .then(() => {
        res.status(201).json({ message: `Handcraft with ID ${id} Updated` });
      })
      .catch((err) => {
        res.status(500).json({ message: "tesw" });
        // next({ name: "InternalError", message: err.message });
      });
  }
};
