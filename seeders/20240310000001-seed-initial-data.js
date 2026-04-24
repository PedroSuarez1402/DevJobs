'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const bcrypt = (await import('bcrypt')).default;
    const passwordHash = await bcrypt.hash('password123', 10);
    const adminPasswordHash = await bcrypt.hash('Admin1234', 10);

    const usuariosSeed = [
      {
        nombre: 'Pedro Recrutador',
        email: 'pedro@recrutador.com',
        password: passwordHash,
        resumen: 'Reclutador Senior con 10 años de experiencia.',
        fecha_creacion: new Date(),
        confirmado: true,
        rol: 'empleador'
      },
      {
        nombre: 'Juan Candidato',
        email: 'juan@candidato.com',
        password: passwordHash,
        resumen: 'Desarrollador Full Stack Jr.',
        fecha_creacion: new Date(),
        confirmado: true,
        rol: 'candidato'
      },
      {
        nombre: 'Ana Dev',
        email: 'ana@dev.com',
        password: passwordHash,
        resumen: 'Frontend Developer con React y Vue.',
        fecha_creacion: new Date(),
        confirmado: true,
        rol: 'candidato'
      },
      {
        nombre: 'Super Admin',
        email: 'admin@devjobs.com',
        password: adminPasswordHash,
        resumen: 'Administrador del sistema.',
        fecha_creacion: new Date(),
        confirmado: true,
        rol: 'admin'
      }
    ];

    for (const u of usuariosSeed) {
      await queryInterface.sequelize.query(
        `
          INSERT INTO usuarios (nombre, email, password, resumen, fecha_creacion, confirmado, rol)
          VALUES (:nombre, :email, :password, :resumen, :fecha_creacion, :confirmado, :rol)
          ON DUPLICATE KEY UPDATE
            nombre = VALUES(nombre),
            password = VALUES(password),
            resumen = VALUES(resumen),
            confirmado = VALUES(confirmado),
            rol = VALUES(rol)
        `,
        { replacements: u }
      );
    }

    const [usuarios] = await queryInterface.sequelize.query(
      `
        SELECT id, email
        FROM usuarios
        WHERE email IN ('pedro@recrutador.com','juan@candidato.com','ana@dev.com','admin@devjobs.com')
      `
    );
    const usuarioPedro = usuarios.find((u) => u.email === 'pedro@recrutador.com');
    const usuarioJuan = usuarios.find((u) => u.email === 'juan@candidato.com');

    // Insertar CVs
    await queryInterface.bulkDelete('cvs', { usuario_id: usuarioJuan.id });
    await queryInterface.bulkInsert('cvs', [
      {
        usuario_id: usuarioJuan.id,
        tipo: 'generado',
        titular: 'Desarrollador Full Stack',
        resumen: 'Perfil generado por seeder para pruebas.',
        experiencia: JSON.stringify([
          {
            cargo: 'Desarrollador',
            empresa: 'Empresa X',
            inicio: '2023-01-01',
            fin: '2024-01-01',
            logros: 'Construcción de funcionalidades en Node.js y MySQL.'
          }
        ]),
        educacion: JSON.stringify([
          {
            titulo: 'Ingeniería en Sistemas',
            institucion: 'Universidad',
            anio: '2022'
          }
        ]),
        fecha_actualizacion: new Date()
      }
    ]);

    // Insertar Vacantes
    await queryInterface.bulkDelete('vacantes', {
      empleador_id: usuarioPedro.id,
      titulo: { [Sequelize.Op.in]: ['Desarrollador React Senior', 'Backend Developer Node.js'] }
    });
    await queryInterface.bulkInsert('vacantes', [
      {
        empleador_id: usuarioPedro.id,
        titulo: 'Desarrollador React Senior',
        descripcion: 'Buscamos un experto en React para liderar nuestro equipo de frontend.',
        salario: 5000.00,
        tipo_contrato: 'Indefinido',
        ubicacion: 'Remoto',
        fecha_publicacion: new Date(),
        estado: 'abierta'
      },
      {
        empleador_id: usuarioPedro.id,
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
    await queryInterface.bulkDelete('canales', { nombre: 'Desarrollo Web' });
    await queryInterface.bulkInsert('canales', [
      {
        nombre: 'Desarrollo Web',
        descripcion: 'Canal para discutir las últimas tendencias en la web.',
        creador_id: usuarioPedro.id,
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
