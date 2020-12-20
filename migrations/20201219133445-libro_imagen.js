'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'libros',
      'imagen',
     Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'libros',
      'imagen'
    );
  }
};
