'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cvs', 'titular', {
      type: Sequelize.STRING(100),
      allowNull: true
    });
    await queryInterface.addColumn('cvs', 'resumen', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('cvs', 'experiencia', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('cvs', 'educacion', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('cvs', 'skills_tecnicas', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('cvs', 'skills_blandas', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('cvs', 'github', {
      type: Sequelize.STRING(255),
      allowNull: true
    });
    await queryInterface.addColumn('cvs', 'telefono', {
      type: Sequelize.STRING(20),
      allowNull: true
    });
    
    const tableInfo = await queryInterface.describeTable('cvs');
    if (tableInfo.contenido) {
      await queryInterface.removeColumn('cvs', 'contenido');
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cvs', 'titular');
    await queryInterface.removeColumn('cvs', 'resumen');
    await queryInterface.removeColumn('cvs', 'experiencia');
    await queryInterface.removeColumn('cvs', 'educacion');
    await queryInterface.removeColumn('cvs', 'skills_tecnicas');
    await queryInterface.removeColumn('cvs', 'skills_blandas');
    await queryInterface.removeColumn('cvs', 'github');
    await queryInterface.removeColumn('cvs', 'telefono');
    await queryInterface.addColumn('cvs', 'contenido', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  }
};
