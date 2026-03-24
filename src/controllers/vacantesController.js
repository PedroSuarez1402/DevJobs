import { getVacantes } from '../services/homeService.js';
import { actualizarVacante, eliminarVacanteDb, getMisVacantes, guardarVacante, showVacante } from '../services/vacanteService.js';

export const Vacantes = async (req, res) => {
    const usuarioId = req.session?.usuario?.id || null;
    const vacantes = await getVacantes(usuarioId);

    res.render('vacantes/vacantes', {
        barra: true,
        nombre: req.session.usuario.nombre,
        email: req.session.usuario.email,
        foto_perfil: req.session.usuario.foto_perfil,
        vacantes: vacantes
    });
}
export const formularioNuevaVacante = (req, res) => {
    res.render('vacantes/nueva', {
        nombre: req.session.usuario.nombre,
        email: req.session.usuario.email,
        foto_perfil: req.session.usuario.foto_perfil
    });
}

export const crearVacante = async (req, res) => {
    try {
        const empleador_id = req.session.usuario.id;

        await guardarVacante(req.body, empleador_id);

        req.flash('exito', 'Vacante creada con éxito');
        res.redirect('/vacantes');
    } catch (error) {
        req.flash('error', 'Error al crear la vacante');
        res.redirect('/vacantes/nueva');
    }
}

export const verVacante = async (req, res) => {
    try {
    const id = req.params.id;
    const vacante = await showVacante(id);
    if (!vacante) {
        req.flash('error', 'Vacante no encontrada');
        res.redirect('/vacantes');
    }
    res.render('vacantes/show', {
        barra: true,
        nombre: req.session.usuario.nombre,
        email: req.session.usuario.email,
        foto_perfil: req.session.usuario.foto_perfil,
        vacante: vacante
    });
    } catch (error) {
        req.flash('error', 'Error al ver la vacante');
        res.redirect('/vacantes');
    }
}

export const misVacantes = async (req, res) => {
    try {
        const empleador_id = req.session.usuario.id;
        const vacantes = await getMisVacantes(empleador_id);

        res.render('vacantes/mis-vacantes', {
            nombrePagina: 'Panel de Administracion',
            tagline: 'Gestiona tus ofertas de empleo y revisa los candidatos',
            nombre: req.session.usuario.nombre,
            vacantes: vacantes
        });
    } catch (error) {
        req.flash('error', 'Error al cargar tu panel de administracion');
        res.redirect('/vacantes');
    }
}
// Funcion para mostrar la vista de editar vacante
export const formularioEditarVacante = async (req, res) => {
    try {
        const vacante = await showVacante(req.params.id);
        if (!vacante || vacante.empleador_id !== req.session.usuario.id){
            req.flash('error', 'No tienes permisos para editar esta vacante');
            return res.redirect('/vacantes/mis-vacantes');
        }
        res.render('vacantes/editar', {
            nombrePagina: `Editar: ${vacante.titulo}`,
            tagline: 'Edita los detalles de tu oferta de empleo',
            nombre: req.session.usuario.nombre,
            vacante
        });
    } catch (error) {
        req.flash('error', 'Hubo un error al cargar la vacante');
        res.redirect('/vacantes/mis-vacantes');
    }
}
// Guardar los cambios de la vacante
export const editarVacante = async (req, res) => {
    try {
        const vacante = await showVacante(req.params.id);

        // REGLA DE SEGURIDAD NUEVAMENTE (Nunca confíes en el frontend)
        if (!vacante || vacante.empleador_id !== req.session.usuario.id) {
            req.flash('error', 'Operación no permitida');
            return res.redirect('/vacantes/mis-vacantes');
        }

        await actualizarVacante(req.params.id, req.body);

        req.flash('exito', 'Vacante actualizada correctamente');
        res.redirect('/vacantes/mis-vacantes');
    } catch (error) {
        req.flash('error', 'Error al guardar los cambios');
        res.redirect(`/vacantes/editar/${req.params.id}`);
    }
}
// Eliminar la vacante
export const eliminarVacante = async (req, res) => {
    try {
        const vacante = await showVacante(req.params.id);

        // REGLA DE SEGURIDAD
        if (!vacante || vacante.empleador_id !== req.session.usuario.id) {
            req.flash('error', 'Operación no permitida');
            return res.redirect('/vacantes/mis-vacantes');
        }

        await eliminarVacanteDb(req.params.id);

        req.flash('exito', 'Vacante eliminada permanentemente');
        res.redirect('/vacantes/mis-vacantes');
    } catch (error) {
        req.flash('error', 'Error al eliminar la vacante');
        res.redirect('/vacantes/mis-vacantes');
    }
}