import * as perfilService from '../services/perfilService.js';

/* Mostrar el perfil del usuario */
export const mostrarPerfil = async (req, res) => {
    try {
        // Si hay un id en la URL lo usamos, si no usamos el del usuario logueado
        const usuarioId = req.params.id || req.session.usuario.id;
        const perfil = await perfilService.obtenerPerfilCompleto(usuarioId);

        if (!perfil || !perfil.usuario) {
            req.flash('error', 'El perfil solicitado no existe');
            return res.redirect('/');
        }

        const { usuario, cv } = perfil;
        
        // Verificar si el perfil que se está viendo es el del usuario logueado
        const esPerfilPropio = usuarioId == req.session.usuario.id;

        res.render('perfil/perfil', {
            nombrePagina: esPerfilPropio ? 'Mi Perfil' : `Perfil: ${usuario.nombre}`,
            tagline: esPerfilPropio ? 'Gestiona tu información profesional y CV' : `Conoce la trayectoria de ${usuario.nombre}`,
            usuario,
            cv,
            esPerfilPropio,
            mostrarNav: true
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Hubo un error al cargar el perfil');
        res.redirect('/');
    }
}

/* Mostrar formulario de edición de perfil */
export const formularioEditarPerfil = async (req, res) => {
    try {
        const { id } = req.session.usuario;
        const { usuario, cv } = await perfilService.obtenerPerfilCompleto(id);

        res.render('perfil/editar-perfil', {
            nombrePagina: 'Editar Perfil Profesional',
            tagline: 'Completa tu información para destacar ante los reclutadores',
            usuario,
            cv: cv || {},
            mostrarNav: true
        });
    } catch (error) {
        console.error(error);
        res.redirect('/perfil');
    }
}

/* Guardar cambios del perfil y CV */
export const editarPerfil = async (req, res) => {
    try {
        const { id } = req.session.usuario;
        
        await perfilService.actualizarPerfilYCV(id, req.body, req.files);

        req.flash('exito', 'Perfil actualizado correctamente');
        res.redirect('/perfil');

    } catch (error) {
        console.error(error);
        req.flash('error', 'No se pudo actualizar el perfil');
        res.redirect('/perfil/editar');
    }
}
