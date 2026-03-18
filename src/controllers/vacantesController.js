import { getVacantes } from '../services/homeService.js';
import { guardarVacante } from '../services/vacanteService.js';

export const Vacantes = async (req, res) => {
    const vacantes = await getVacantes();

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