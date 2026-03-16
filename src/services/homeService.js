// Borra las importaciones individuales y cámbialas por esta:
import { Vacantes, Usuario } from '../models/index.js';

export const getVacantes = async () => {
    const vacantes = await Vacantes.findAll({
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