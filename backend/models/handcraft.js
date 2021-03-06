'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Handcraft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Handcraft.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Handcraft',
    timestamps: false,
  });
  return Handcraft;
};