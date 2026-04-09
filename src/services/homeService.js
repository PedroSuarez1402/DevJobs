// Borra las importaciones individuales y cámbialas por esta:
import { Vacantes, Usuario } from '../models/index.js';
import { Op } from 'sequelize';

export const getVacantes = async ( usuarioActualId = null, filtros = {}) => {
    const condicion = {}

    if (usuarioActualId){
        condicion.empleador_id ={
            [Op.ne]: usuarioActualId
        }
    }

    // Filtro por palabra clave (busca en título y descripción)
    if (filtros.keyword && filtros.keyword.trim() !== '') {
        const keyword = filtros.keyword.trim();
        condicion[Op.or] = [
            { titulo: { [Op.like]: `%${keyword}%` } },
            { descripcion: { [Op.like]: `%${keyword}%` } }
        ];
    }

    // Filtro por ubicación
    if (filtros.ubicacion && filtros.ubicacion.trim() !== '') {
        condicion.ubicacion = { [Op.like]: `%${filtros.ubicacion.trim()}%` };
    }

    // Filtro por tipo de contrato
    if (filtros.tipo_contrato && filtros.tipo_contrato.trim() !== '') {
        condicion.tipo_contrato = filtros.tipo_contrato.trim();
    }

    const VACANTES_POR_PAGINA = 10;
    const pagina = filtros.pagina ? parseInt(filtros.pagina) : 1;
    const offset = (pagina - 1) * VACANTES_POR_PAGINA;

    const { count, rows } = await Vacantes.findAndCountAll({
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
        ],
        limit: VACANTES_POR_PAGINA,
        offset: offset
    });

    const totalPaginas = Math.ceil(count / VACANTES_POR_PAGINA);
    
    return {
        vacantes: rows.map(vacante => vacante.toJSON()),
        paginacion: {
            paginaActual: pagina,
            totalPaginas,
            totalVacantes: count,
            haySiguiente: pagina < totalPaginas,
            hayAnterior: pagina > 1
        }
    };
}