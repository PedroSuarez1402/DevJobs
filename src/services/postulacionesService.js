import { where } from 'sequelize'
import { Postulaciones, CVs, Vacantes } from '../models/index.js'

export const verificarCV = async (usuario_id) => {
    const cv = await CVs.findOne({where: {usuario_id}})
    return cv;
}

export const verificarPostulacionPrevia = async (candidato_id, vacante_id) => {
    const postulacion = await Postulaciones.findOne({
        where: {candidato_id, vacante_id}
    })
    return postulacion;
}

export const verificarPropietarioVacante = async (candidato_id, vacante_id) => {
    const vacante = await Vacantes.findByPk(vacante_id);
    return vacante && vacante.empleador_id === candidato_id;
}

export const crearPostulacionDb = async (candidato_id, vacante_id) => {
    const postulacion = await Postulaciones.create({
        candidato_id,
        vacante_id
    })
    return postulacion;
}
