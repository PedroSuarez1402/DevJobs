import { Op } from 'sequelize';
import { Usuario, Vacantes, Postulaciones } from '../models/index.js';

const LIMITE_POR_DEFECTO = 10;

const construirPaginacion = (count, pagina, limit) => {
    const totalPaginas = Math.ceil(count / limit) || 1;
    return {
        paginaActual: pagina,
        totalPaginas,
        total: count,
        haySiguiente: pagina < totalPaginas,
        hayAnterior: pagina > 1
    };
};

export const listarUsuariosAdmin = async ({ pagina = 1, limit = LIMITE_POR_DEFECTO, q = '', rol = '', estado = '' } = {}) => {
    const where = {};
    const busqueda = String(q || '').trim();

    if (busqueda) {
        where[Op.or] = [
            { nombre: { [Op.like]: `%${busqueda}%` } },
            { email: { [Op.like]: `%${busqueda}%` } },
            { rol: { [Op.like]: `%${busqueda}%` } }
        ];
    }

    if (rol) where.rol = rol;
    if (estado === 'activo') where.confirmado = true;
    if (estado === 'suspendido') where.confirmado = false;

    const offset = (pagina - 1) * limit;
    const { count, rows } = await Usuario.findAndCountAll({
        where,
        attributes: ['id', 'nombre', 'email', 'rol', 'confirmado', 'fecha_creacion'],
        order: [['id', 'DESC']],
        limit,
        offset
    });

    return {
        data: rows.map((u) => u.toJSON()),
        paginacion: construirPaginacion(count, pagina, limit)
    };
};

export const suspenderUsuarioAdmin = async (usuarioId) => {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) throw new Error('Usuario no encontrado');
    usuario.confirmado = false;
    await usuario.save();
    return usuario;
};

export const reactivarUsuarioAdmin = async (usuarioId) => {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) throw new Error('Usuario no encontrado');
    usuario.confirmado = true;
    await usuario.save();
    return usuario;
};

export const listarVacantesAdmin = async ({ pagina = 1, limit = LIMITE_POR_DEFECTO, q = '', estado = '' } = {}) => {
    const where = {};
    const busqueda = String(q || '').trim();

    if (busqueda) {
        where[Op.or] = [
            { titulo: { [Op.like]: `%${busqueda}%` } },
            { descripcion: { [Op.like]: `%${busqueda}%` } },
            { ubicacion: { [Op.like]: `%${busqueda}%` } },
            { tipo_contrato: { [Op.like]: `%${busqueda}%` } }
        ];
    }
    if (estado) where.estado = estado;

    const offset = (pagina - 1) * limit;
    const { count, rows } = await Vacantes.findAndCountAll({
        where,
        include: [{ model: Usuario, as: 'creador', attributes: ['id', 'nombre', 'email'] }],
        order: [['id', 'DESC']],
        limit,
        offset,
        distinct: true
    });

    return {
        data: rows.map((v) => v.toJSON()),
        paginacion: construirPaginacion(count, pagina, limit)
    };
};

export const cerrarVacanteAdmin = async (vacanteId) => {
    const vacante = await Vacantes.findByPk(vacanteId);
    if (!vacante) throw new Error('Vacante no encontrada');
    vacante.estado = 'cerrada';
    await vacante.save();
    return vacante;
};

export const abrirVacanteAdmin = async (vacanteId) => {
    const vacante = await Vacantes.findByPk(vacanteId);
    if (!vacante) throw new Error('Vacante no encontrada');
    vacante.estado = 'abierta';
    await vacante.save();
    return vacante;
};

export const listarPostulacionesAdmin = async ({ pagina = 1, limit = LIMITE_POR_DEFECTO, q = '', estado = '' } = {}) => {
    const where = {};
    const busqueda = String(q || '').trim();

    if (estado) where.estado = estado;
    if (busqueda) {
        where[Op.or] = [
            { '$usuario.nombre$': { [Op.like]: `%${busqueda}%` } },
            { '$usuario.email$': { [Op.like]: `%${busqueda}%` } },
            { '$vacante.titulo$': { [Op.like]: `%${busqueda}%` } }
        ];
    }

    const include = [
        {
            model: Usuario,
            attributes: ['id', 'nombre', 'email']
        },
        {
            model: Vacantes,
            attributes: ['id', 'titulo']
        }
    ];

    const offset = (pagina - 1) * limit;
    const { count, rows } = await Postulaciones.findAndCountAll({
        where,
        include,
        order: [['id', 'DESC']],
        limit,
        offset,
        distinct: true
    });

    return {
        data: rows.map((p) => p.toJSON()),
        paginacion: construirPaginacion(count, pagina, limit)
    };
};

export const rechazarPostulacionAdmin = async (postulacionId) => {
    const postulacion = await Postulaciones.findByPk(postulacionId);
    if (!postulacion) throw new Error('Postulación no encontrada');
    postulacion.estado = 'rechazado';
    await postulacion.save();
    return postulacion;
};

export const restablecerPostulacionAdmin = async (postulacionId) => {
    const postulacion = await Postulaciones.findByPk(postulacionId);
    if (!postulacion) throw new Error('Postulación no encontrada');
    postulacion.estado = 'pendiente';
    await postulacion.save();
    return postulacion;
};
