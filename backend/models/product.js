"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart, { foreignKey: "productId" });
      Product.belongsTo(models.Category, {
        foreignKey: "category",
        targetKey: "category",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      image_url: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false,
    }
  );
  return Product;
};
