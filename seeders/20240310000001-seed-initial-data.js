'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // Insertar Usuarios
    await queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Pedro Recrutador',
        email: 'pedro@recrutador.com',
        password: 'password123',
        resumen: 'Reclutador Senior con 10 años de experiencia.',
        fecha_creacion: new Date(),
        confirmado: true
      },
      {
        nombre: 'Juan Candidato',
        email: 'juan@candidato.com',
        password: 'password123',
        resumen: 'Desarrollador Full Stack Jr.',
        fecha_creacion: new Date(),
        confirmado: true
      },
      {
        nombre: 'Ana Dev',
        email: 'ana@dev.com',
        password: 'password123',
        resumen: 'Frontend Developer con React y Vue.',
        fecha_creacion: new Date(),
        confirmado: true
      }
    ]);

    // Obtener los IDs insertados
    const [usuarios] = await queryInterface.sequelize.query('SELECT id FROM usuarios');

    // Insertar CVs
    await queryInterface.bulkInsert('cvs', [
      {
        usuario_id: usuarios[1].id,
        tipo: 'generado',
        contenido: JSON.stringify({ experiencia: 'Desarrollador en Empresa X', educacion: 'Ingeniería en Sistemas' }),
        fecha_actualizacion: new Date()
      }
    ]);

    // Insertar Vacantes
    await queryInterface.bulkInsert('vacantes', [
      {
        empleador_id: usuarios[0].id,
        titulo: 'Desarrollador React Senior',
        descripcion: 'Buscamos un experto en React para liderar nuestro equipo de frontend.',
        salario: 5000.00,
        tipo_contrato: 'Indefinido',
        ubicacion: 'Remoto',
        fecha_publicacion: new Date(),
        estado: 'abierta'
      },
      {
        empleador_id: usuarios[0].id,
        titulo: 'Backend Developer Node.js',
        descripcion: 'Únete a nuestro equipo para construir APIs robustas con Express y Sequelize.',
        salario: 4500.00,
        tipo_contrato: 'Proyecto',
        ubicacion: 'Madrid, España',
        fecha_publicacion: new Date(),
        estado: 'abierta'
      }
    ]);

    // Insertar Canales
    await queryInterface.bulkInsert('canales', [
      {
        nombre: 'Desarrollo Web',
        descripcion: 'Canal para discutir las últimas tendencias en la web.',
        creador_id: usuarios[0].id,
        fecha_creacion: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('canales', null, {});
    await queryInterface.bulkDelete('vacantes', null, {});
    await queryInterface.bulkDelete('cvs', null, {});
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
