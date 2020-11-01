'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.LibroCarrito, {
        as: 'LibroCarritos',
        foreignKey: 'carritoId'
      });
    }
  };
  Carrito.init({
    nit: DataTypes.STRING,
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carrito',
  });
  return Carrito;
};