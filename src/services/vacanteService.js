import { Vacantes, Usuario } from "../models/index.js"
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