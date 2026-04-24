import {
    listarUsuariosAdmin,
    suspenderUsuarioAdmin,
    reactivarUsuarioAdmin,
    listarVacantesAdmin,
    cerrarVacanteAdmin,
    abrirVacanteAdmin,
    listarPostulacionesAdmin,
    rechazarPostulacionAdmin,
    restablecerPostulacionAdmin
} from '../services/adminService.js';

export const panelPrincipal = async (req, res) => {
    try {
        const [{ paginacion: usuariosMeta }, { paginacion: vacantesMeta }, { paginacion: postulacionesMeta }, { data: ultimosUsuarios }] = await Promise.all([
            listarUsuariosAdmin({ pagina: 1, limit: 1 }),
            listarVacantesAdmin({ pagina: 1, limit: 1 }),
            listarPostulacionesAdmin({ pagina: 1, limit: 1 }),
            listarUsuariosAdmin({ pagina: 1, limit: 5 })
        ]);

        res.render('admin/dashboard', {
            nombrePagina: 'SuperAdmin',
            tagline: 'Panel de Control',
            totalUsuarios: usuariosMeta.total,
            totalVacantes: vacantesMeta.total,
            totalPostulaciones: postulacionesMeta.total,
            ultimosUsuarios
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'No se pudo cargar el panel de administración');
        res.redirect('/vacantes');
    }
};

const obtenerParametros = (query) => ({
    pagina: Number.parseInt(query.pagina || '1', 10) || 1,
    limit: 10,
    q: query.q || '',
    rol: query.rol || '',
    estado: query.estado || ''
});

export const listarUsuarios = async (req, res) => {
    try {
        const filtros = obtenerParametros(req.query);
        const { data, paginacion } = await listarUsuariosAdmin(filtros);
        res.render('admin/usuarios', {
            nombrePagina: 'SuperAdmin - Usuarios',
            tagline: 'Gestión de Usuarios',
            usuarios: data,
            paginacion,
            filtros
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'No se pudieron cargar los usuarios');
        res.redirect('/admin');
    }
};

export const suspenderUsuario = async (req, res) => {
    try {
        const usuarioId = Number.parseInt(req.params.id, 10);
        if (req.session?.usuario?.id === usuarioId) {
            req.flash('error', 'No puedes suspender tu propio usuario');
            return res.redirect('/admin/usuarios');
        }
        await suspenderUsuarioAdmin(usuarioId);
        req.flash('exito', 'Usuario suspendido correctamente');
    } catch (error) {
        req.flash('error', error.message || 'No se pudo suspender el usuario');
    }
    return res.redirect('/admin/usuarios');
};

export const reactivarUsuario = async (req, res) => {
    try {
        const usuarioId = Number.parseInt(req.params.id, 10);
        await reactivarUsuarioAdmin(usuarioId);
        req.flash('exito', 'Usuario reactivado correctamente');
    } catch (error) {
        req.flash('error', error.message || 'No se pudo reactivar el usuario');
    }
    return res.redirect('/admin/usuarios');
};

export const listarVacantes = async (req, res) => {
    try {
        const filtros = obtenerParametros(req.query);
        const { data, paginacion } = await listarVacantesAdmin(filtros);
        res.render('admin/vacantes', {
            nombrePagina: 'SuperAdmin - Vacantes',
            tagline: 'Gestión de Vacantes',
            vacantes: data,
            paginacion,
            filtros
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'No se pudieron cargar las vacantes');
        res.redirect('/admin');
    }
};

export const cerrarVacante = async (req, res) => {
    try {
        await cerrarVacanteAdmin(Number.parseInt(req.params.id, 10));
        req.flash('exito', 'Vacante cerrada correctamente');
    } catch (error) {
        req.flash('error', error.message || 'No se pudo cerrar la vacante');
    }
    return res.redirect('/admin/vacantes');
};

export const abrirVacante = async (req, res) => {
    try {
        await abrirVacanteAdmin(Number.parseInt(req.params.id, 10));
        req.flash('exito', 'Vacante reactivada correctamente');
    } catch (error) {
        req.flash('error', error.message || 'No se pudo reactivar la vacante');
    }
    return res.redirect('/admin/vacantes');
};

export const listarPostulaciones = async (req, res) => {
    try {
        const filtros = obtenerParametros(req.query);
        const { data, paginacion } = await listarPostulacionesAdmin(filtros);
        res.render('admin/postulaciones', {
            nombrePagina: 'SuperAdmin - Postulaciones',
            tagline: 'Gestión de Postulaciones',
            postulaciones: data,
            paginacion,
            filtros
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'No se pudieron cargar las postulaciones');
        res.redirect('/admin');
    }
};

export const rechazarPostulacion = async (req, res) => {
    try {
        await rechazarPostulacionAdmin(Number.parseInt(req.params.id, 10));
        req.flash('exito', 'Postulación inactivada correctamente');
    } catch (error) {
        req.flash('error', error.message || 'No se pudo inactivar la postulación');
    }
    return res.redirect('/admin/postulaciones');
};

export const restablecerPostulacion = async (req, res) => {
    try {
        await restablecerPostulacionAdmin(Number.parseInt(req.params.id, 10));
        req.flash('exito', 'Postulación restablecida correctamente');
    } catch (error) {
        req.flash('error', error.message || 'No se pudo restablecer la postulación');
    }
    return res.redirect('/admin/postulaciones');
};

