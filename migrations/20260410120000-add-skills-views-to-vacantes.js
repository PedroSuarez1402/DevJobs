'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('vacantes', 'skills', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('vacantes', 'visualizaciones', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('vacantes', 'skills');
    await queryInterface.removeColumn('vacantes', 'visualizaciones');
  }
};
