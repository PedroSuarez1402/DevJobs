// Borra las importaciones individuales y cámbialas por esta:
import { Vacantes, Usuario } from '../models/index.js';
import { Op } from 'sequelize';

export const getVacantes = async ( usuarioActualId = null) => {
    const condicion = {}

    if (usuarioActualId){
        condicion.empleador_id ={
            [Op.ne]: usuarioActualId
        }
    }
    const vacantes = await Vacantes.findAll({
        where: condicion,
        include: [
            {
                model: Usuario,
                as: 'creador',
                attributes: ['id', 'nombre', 'email']
            }
        ],
        order: [
            ['fecha_publicacion', 'DESC']
        ]
    });
    
    // Los "limpiamos" para que sean objetos JSON puros que Handlebars pueda leer
    return vacantes.map(vacante => vacante.toJSON());
}