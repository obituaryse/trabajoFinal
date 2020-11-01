'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Libros',
        'autorId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Autors'
            },
            key: 'id',
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        }
      ),
      queryInterface.addColumn(
        'LibroCarritos',
        'libroId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Libros'
            },
            key: 'id',
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        }
      ),
      queryInterface.addColumn(
        'LibroCarritos',
        'carritoId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Carritos'
            },
            key: 'id',
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Libro', 'autorId'),
      queryInterface.removeColumn('LibroCarritos', 'libroId'),
      queryInterface.removeColumn('LibroCarritos', 'carritoId')
    ]);
  }
};
