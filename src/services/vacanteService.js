import { Vacantes, Usuario, Postulaciones, CVs } from "../models/index.js"
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
            empleador_id: empleador_id
        });
        return vacante;
    } catch (error) {
        console.error("Error al guardar la vacante:", error);
        throw error;
    }
}

export const showVacante = async (id) => {
    try {
        const vacante = await Vacantes.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    as: 'creador',
                    attributes: ['nombre', 'email', 'foto_perfil']
                }
            ]
        });
        if (!vacante) return null;
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
                    model: Usuario,
                    attributes: ['id', 'nombre', 'foto_perfil', 'email'],
                    // ¡NUEVO! Traemos el CV del candidato
                    include: [{ model: CVs, attributes: ['url_archivo', 'tipo'] }] 
                }
            ]
        });
        return candidatos.map(postulacion => postulacion.toJSON());
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