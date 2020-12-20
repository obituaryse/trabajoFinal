'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Autor, {
        as: 'autor',
        foreignKey: 'autorId'
      });
      this.hasMany(models.Carrito, {
        as: 'carritos',
        foreignKey: 'libroId'
      });
    }
  };
  Libro.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Libro',
  });
  return Libro;
};