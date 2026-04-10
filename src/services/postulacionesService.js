import { where } from 'sequelize'
import { Postulaciones, CVs, Vacantes, Usuario } from '../models/index.js'

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
/* Obtener mis postulaciones */
export const getMisPostulaciones = async (candidato_id) => {
    const postulaciones = await Postulaciones.findAll({
        where: {candidato_id},
        include: [
            {
                model: Vacantes,
                include: [
                    {
                        model: Usuario,
                        as: 'creador',
                        attributes: ['id', 'nombre', 'foto_perfil']
                    }
                ]
            }
        ],
        order: [['id', 'DESC']]
    })
    return postulaciones.map(postulacion => postulacion.toJSON());
}
