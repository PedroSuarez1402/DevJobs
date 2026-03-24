import { Vacantes, Usuario, Postulaciones } from "../models/index.js"
/* Crear una nueva vacante */
export const guardarVacante = async (datosVacante, empleador_id) => {
    try {
        // Si el checkbox 'remoto' está activado, la ubicación se guarda como 'Remoto'.
        // De lo contrario, se utiliza el valor del campo de ubicación.
        const ubicacionFinal = datosVacante.remoto === 'on' ? 'Remoto' : datosVacante.ubicacion;

        const vacante = await Vacantes.create({
            titulo: datosVacante.titulo,
            descripcion: datosVacante.descripcion,
            salario: datosVacante.salario,
            tipo_contrato: datosVacante.tipo_contrato,
            ubicacion: ubicacionFinal, // Usar la ubicación procesada
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
                    as:'creador',
                    attributes: ['nombre', 'email', 'foto_perfil']
                }
            ]
        });
        if(!vacante){
            return null;
        }
        return vacante.toJSON();
    } catch (error) {
        console.error("Error al obtener la vacante:", error);
        throw error;
    }
}

// Funcion para obtener las vacantes que creo el usuario loggeado
export const getMisVacantes = async (empleador_id) => {
    try {
        const misVacantes = await Vacantes.findAll({
            where: { empleador_id: empleador_id },
            include: [
                {
                    model: Postulaciones, // Traemos a los candidatos que se postularon
                    include: [
                        {
                            model: Usuario, // Traemos los datos del candidato
                            attributes: ['id', 'nombre', 'foto_perfil', 'email']
                        }
                    ]
                }
            ],
            order: [['fecha_publicacion', 'DESC']]
        })
    return misVacantes.map(vacante => vacante.toJSON());
    } catch (error) {
        console.error("Error al obtener mis vacantes:", error);
        throw error;
    }
}
// Funcion para actualizar vacante
export const actualizarVacante = async (id, datosActualizados) => {
    try {
        const vacante = await Vacantes.findByPk(id);
        const ubicacionFinal = datosActualizados.remoto === 'on' ? 'Remoto': datosActualizados.ubicacion;

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
// Funcion para eliminar una vacante
export const eliminarVacanteDb = async (id) => {
    try {
        await Vacantes.destroy({
            where: { id: id }
        })
        return true;
    } catch (error) {
        console.error("Error al eliminar la vacante:", error);
        throw error;
    }
}