'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LibroCarrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Libro, {
        as: 'libro',
        foreignKey: 'libroId'
      });
      this.belongsTo(models.Carrito, {
        as: 'carrito',
        foreignKey: 'carritoId'
      });
    }
  };
  LibroCarrito.init({
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LibroCarrito',
  });
  return LibroCarrito;
};