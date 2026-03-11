'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Tabla Usuarios
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      foto_perfil: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      resumen: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tabla CVs
    await queryInterface.createTable('cvs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo: {
        type: Sequelize.ENUM('archivo', 'generado'),
        allowNull: false
      },
      contenido: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      url_archivo: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      fecha_actualizacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tabla Vacantes
    await queryInterface.createTable('vacantes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      empleador_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      titulo: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      salario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      tipo_contrato: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      ubicacion: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      fecha_publicacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      estado: {
        type: Sequelize.ENUM('abierta', 'cerrada'),
        defaultValue: 'abierta'
      }
    });

    // Tabla Postulaciones
    await queryInterface.createTable('postulaciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      candidato_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      vacante_id: {
        type: Sequelize.INTEGER,
        references: { model: 'vacantes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fecha_postulacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'aceptado', 'rechazado'),
        defaultValue: 'pendiente'
      }
    });

    // Tabla Canales
    await queryInterface.createTable('canales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      creador_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tabla Miembros_Canal
    await queryInterface.createTable('miembros_canal', {
      usuario_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      canal_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'canales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // Tabla Posts
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      autor_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      contenido: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      canal_id: {
        type: Sequelize.INTEGER,
        references: { model: 'canales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fecha_publicacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tabla Seguidores
    await queryInterface.createTable('seguidores', {
      seguidor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      seguido_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('seguidores');
    await queryInterface.dropTable('posts');
    await queryInterface.dropTable('miembros_canal');
    await queryInterface.dropTable('canales');
    await queryInterface.dropTable('postulaciones');
    await queryInterface.dropTable('vacantes');
    await queryInterface.dropTable('cvs');
    await queryInterface.dropTable('usuarios');
  }
};
