'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'telefono', {
      type: Sequelize.STRING(20),
      allowNull: true
    });
    await queryInterface.addColumn('usuarios', 'rol', {
      type: Sequelize.ENUM('candidato', 'empleador', 'admin'),
      defaultValue: 'candidato',
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'rol');
    await queryInterface.removeColumn('usuarios', 'telefono');
  }
};
