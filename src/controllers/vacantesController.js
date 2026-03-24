import { getVacantes } from '../services/homeService.js';
import { getMisVacantes, guardarVacante, showVacante } from '../services/vacanteService.js';

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