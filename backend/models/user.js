'use strict';
const {
  Model
} = require('sequelize');
const { encode } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, {foreignKey:'userId'})
      User.hasMany(models.Transaction, {foreignKey:'userId'})
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    hooks:{
      beforeCreate:instance=>{
        instance.password=encode(instance.password)
      }
    }
  });
  return User;
};