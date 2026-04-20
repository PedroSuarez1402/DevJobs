'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'skills', {
      type: Sequelize.TEXT, // Usamos TEXT para poder guardar un array convertido a JSON (string)
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'skills');
    
  }
};
