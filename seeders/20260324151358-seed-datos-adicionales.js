'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 1. Obtener los IDs de los usuarios que YA EXISTEN en tu base de datos
    // Esto evita que intentemos insertarlos de nuevo y nos dé error
    const [usuarios] = await queryInterface.sequelize.query('SELECT id FROM usuarios');

    // Validamos que existan usuarios para no tener errores de foreign key
    if (usuarios.length === 0) {
        console.log('No hay usuarios en la base de datos. Por favor, corre el seeder inicial primero.');
        return;
    }

    // 2. Insertar nuevos CVs (Usamos el ID del tercer usuario, por ejemplo)
    await queryInterface.bulkInsert('cvs', [
      {
        usuario_id: usuarios[2] ? usuarios[2].id : usuarios[0].id, 
        tipo: 'archivo',
        url_archivo: 'cv_ejemplo_2.pdf',
        fecha_actualizacion: new Date()
      }
    ]);

    // 3. Insertar nuevas Vacantes
    await queryInterface.bulkInsert('vacantes', [
      {
        empleador_id: usuarios[0].id,
        titulo: 'Desarrollador Backend Python',
        descripcion: 'Buscamos un desarrollador Python con experiencia en Django o FastAPI para microservicios.',
        salario: 4200.00,
        tipo_contrato: 'Indefinido',
        ubicacion: 'Bogotá, Colombia',
        fecha_publicacion: new Date(),
        estado: 'abierta'
      },
      {
        empleador_id: usuarios[0].id,
        titulo: 'DevOps Engineer Semi-Senior',
        descripcion: 'Se requiere experiencia con AWS, Docker, Kubernetes y CI/CD con GitHub Actions.',
        salario: 6000.00,
        tipo_contrato: 'Fijo',
        ubicacion: 'Remoto',
        fecha_publicacion: new Date(),
        estado: 'abierta'
      },
      {
        empleador_id: usuarios[1] ? usuarios[1].id : usuarios[0].id,
        titulo: 'Diseñador UI/UX',
        descripcion: 'Diseño de interfaces atractivas usando Figma y principios de accesibilidad.',
        salario: 3500.00,
        tipo_contrato: 'Proyecto',
        ubicacion: 'Medellín, Colombia',
        fecha_publicacion: new Date(),
        estado: 'abierta'
      }
    ]);

    // 4. Insertar nuevos Canales
    await queryInterface.bulkInsert('canales', [
      {
        nombre: 'Python Colombia',
        descripcion: 'Comunidad para hablar sobre Python, Django, IA y Data Science.',
        creador_id: usuarios[0].id,
        fecha_creacion: new Date()
      },
      {
        nombre: 'DevOps & Cloud',
        descripcion: 'Todo sobre infraestructura, servidores y despliegues en la nube.',
        creador_id: usuarios[0].id,
        fecha_creacion: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Para el down, si quisieras revertir esto, sería un poco complejo borrar solo estos específicos,
    // pero como es un entorno de desarrollo, podemos dejar los deletes globales o simplemente vacíos.
  }
};