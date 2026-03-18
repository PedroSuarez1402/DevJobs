import { Vacantes, Usuario } from "../models/index.js"
/* Crear una nueva vacante */
export const guardarVacante = async (datosVacante, empleador_id) => {
    try {
        // Si es remoto, guardamos "Remoto", de lo contrario usamos la ubicación seleccionada
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