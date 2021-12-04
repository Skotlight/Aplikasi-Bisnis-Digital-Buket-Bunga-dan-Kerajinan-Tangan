const { Category } = require("../models");

module.exports = class categoryController {
  static fetchAll(req, res, next) {
    Category.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static fetch(req, res, next) {
    let { id } = req.params;
    Category.findOne({ where: { id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static create(req, res, next) {
    let { category } = req.body;
    let newData = { category };
    Category.create(newData)
      .then((data) => {
        let result = {
          category: data.category,
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
    let { category } = req.body;
    let id = +req.params.id;
    let newData = { category };
    Category.update(newData, {
      where: {
        id,
      },
    })
      .then(() => {
        res.status(201).json({ message: `Category ${category} Updated` });
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
    Category.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: "Category Deleted" });
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }

  static async patch(req, res, next) {
    let id = +req.params.id;
    let data = {};
    let category = await Category.findByPk(id);
    req.body.category
      ? (data["category"] = req.body.category)
      : (data["category"] = category.category);
    Category.update(data, {
      where: {
        id,
      },
    })
      .then(() => {
        res.status(201).json({ message: `Category with ID ${id} Updated` });
      })
      .catch((err) => {
        res.status(500).json({ message: "tesw" });
        // next({ name: "InternalError", message: err.message });
      });
  }
};
