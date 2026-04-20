import { Vacantes, Usuario, Postulaciones, CVs } from "../models/index.js"
import { calcularMatchScore } from "../utils/matchScore.js"

// ==========================================
// 1. OPERACIONES BÁSICAS Y PÚBLICAS
// ==========================================

export const guardarVacante = async (datosVacante, empleador_id) => {
    try {
        const ubicacionFinal = datosVacante.remoto === 'on' ? 'Remoto' : datosVacante.ubicacion;
        const vacante = await Vacantes.create({
            titulo: datosVacante.titulo,
            descripcion: datosVacante.descripcion,
            salario: datosVacante.salario,
            tipo_contrato: datosVacante.tipo_contrato,
            ubicacion: ubicacionFinal,
            empleador_id: empleador_id,
            skills: datosVacante.skills // Guardar skills (vendrá como string separado por comas)
        });
        return vacante;
    } catch (error) {
        console.error("Error al guardar la vacante:", error);
        throw error;
    }
}

export const showVacante = async (id, incrementViews = false) => {
    try {
        const vacante = await Vacantes.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    as: 'creador',
                    attributes: ['id', 'nombre', 'email', 'foto_perfil']
                }
            ]
        });
        if (!vacante) return null;

        if (incrementViews) {
            vacante.visualizaciones += 1;
            await vacante.save();
        }

        return vacante.toJSON();
    } catch (error) {
        console.error("Error al obtener la vacante:", error);
        throw error;
    }
}
// ==========================================
// 2. PANEL DE ADMINISTRACIÓN (PRIVADO)
// ==========================================

export const getMisVacantes = async (empleador_id) => {
    try {
        const misVacantes = await Vacantes.findAll({
            where: { empleador_id: empleador_id },
            include: [
                {
                    model: Postulaciones,
                    include: [{ model: Usuario, attributes: ['id', 'nombre', 'foto_perfil', 'email'] }]
                }
            ],
            order: [['fecha_publicacion', 'DESC']]
        });
        return misVacantes.map(vacante => vacante.toJSON());
    } catch (error) {
        console.error("Error al obtener mis vacantes:", error);
        throw error;
    }
}

export const actualizarVacante = async (id, datosActualizados) => {
    try {
        const vacante = await Vacantes.findByPk(id);
        const ubicacionFinal = datosActualizados.remoto === 'on' ? 'Remoto' : datosActualizados.ubicacion;

        vacante.titulo = datosActualizados.titulo;
        vacante.descripcion = datosActualizados.descripcion;
        vacante.salario = datosActualizados.salario;
        vacante.tipo_contrato = datosActualizados.tipo_contrato;
        vacante.ubicacion = ubicacionFinal;
        vacante.skills = datosActualizados.skills; // Actualizar skills

        await vacante.save();
        return vacante;
    } catch (error) {
        console.error("Error al actualizar la vacante:", error);
        throw error;
    }
}

export const eliminarVacanteDb = async (id) => {
    try {
        await Vacantes.destroy({ where: { id: id } });
        return true;
    } catch (error) {
        console.error("Error al eliminar la vacante:", error);
        throw error;
    }
}
// --- NUEVAS FUNCIONES PARA LOS DETALLES ---

export const getCandidatosPorVacante = async (id) => {
    try {
        const candidatos = await Postulaciones.findAll({
            where: { vacante_id: id },
            include: [
                {
                    model: Vacantes,
                    attributes: ['skills']
                },
                {
                    model: Usuario,
                    attributes: ['id', 'nombre', 'foto_perfil', 'email', 'skills', 'telefono'],
                    include: [{ model: CVs, attributes: ['url_archivo', 'tipo', 'skills_tecnicas'] }] 
                }
            ]
        });
        
        // Calcular match score para cada candidato
        return candidatos.map(postulacion => {
            const data = postulacion.toJSON();
            const skillsVacante = data.vacante?.skills || '';
            const cv = data.usuario?.cvs?.[0];
            const skillsCandidato = data.usuario?.skills || cv?.skills_tecnicas || '';
            const telefonoLimpio = (data.usuario?.telefono || '').replace(/\D/g, '');
            
            data.matchScore = calcularMatchScore(skillsVacante, skillsCandidato);
            data.whatsappUrl = telefonoLimpio ? `https://wa.me/${telefonoLimpio}` : null;
            return data;
        });
    } catch (error) {
        console.error("Error al obtener los candidatos:", error);
        throw error;
    }
}

/* Cambiar el estado de la vacante a 'cerrada' */
export const cerrarVacanteDb = async (id) => {
    try {
        const vacante = await Vacantes.findByPk(id);
        vacante.estado = 'cerrada';
        await vacante.save();
        return true;
    } catch (error) {
        console.error("Error al cerrar la vacante:", error);
        throw error;
    }
}

/* Obtener estadísticas detalladas de una vacante */
export const getEstadisticasVacante = async (id, empleadorId) => {
    try {
        const vacante = await Vacantes.findByPk(id, {
            include: [{
                model: Postulaciones,
                attributes: ['fecha_postulacion']
            }]
        });

        if (!vacante) throw new Error('Vacante no encontrada');
        if (vacante.empleador_id !== empleadorId) throw new Error('No autorizado');

        const totalPostulaciones = vacante.postulaciones.length;
        const totalVisualizaciones = vacante.visualizaciones || 0;
        
        // Tasa de conversión (%)
        const tasaConversion = totalVisualizaciones > 0 
            ? ((totalPostulaciones / totalVisualizaciones) * 100).toFixed(1) 
            : 0;

        // Agrupar postulaciones por día (últimos 7 días)
        const postulacionesPorDia = {};
        const hoy = new Date();
        for (let i = 6; i >= 0; i--) {
            const fecha = new Date(hoy);
            fecha.setDate(hoy.getDate() - i);
            const fechaStr = fecha.toISOString().split('T')[0];
            postulacionesPorDia[fechaStr] = 0;
        }

        vacante.postulaciones.forEach(post => {
            const fechaStr = new Date(post.fecha_postulacion).toISOString().split('T')[0];
            if (postulacionesPorDia.hasOwnProperty(fechaStr)) {
                postulacionesPorDia[fechaStr]++;
            }
        });

        return {
            titulo: vacante.titulo,
            totalPostulaciones,
            totalVisualizaciones,
            tasaConversion,
            labels: Object.keys(postulacionesPorDia),
            data: Object.values(postulacionesPorDia)
         };
     } catch (error) {
         console.error("Error al obtener estadísticas:", error);
         throw error;
     }
}

/* Cambiar el estado de una postulación (aceptar/rechazar) */
export const cambiarEstadoPostulacion = async (postulacionId, nuevoEstado, empleadorId) => {
    try {
        // Validar que el estado sea válido
        const estadosValidos = ['aceptado', 'rechazado'];
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error('Estado no válido');
        }

        // Buscar la postulación con su vacante y el candidato
        const postulacion = await Postulaciones.findByPk(postulacionId, {
            include: [
                { model: Vacantes },
                { model: Usuario, attributes: ['nombre', 'email'] }
            ]
        });

        if (!postulacion) {
            throw new Error('Postulación no encontrada');
        }

        // Verificar que el empleador sea el dueño de la vacante
        if (postulacion.vacante.empleador_id !== empleadorId) {
            throw new Error('No tienes permisos para modificar esta postulación');
        }

        // Actualizar el estado
        postulacion.estado = nuevoEstado;
        await postulacion.save();

        return postulacion;
    } catch (error) {
        console.error("Error al cambiar estado de postulación:", error);
        throw error;
    }
}
