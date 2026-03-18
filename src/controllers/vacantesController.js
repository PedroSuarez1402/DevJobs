import { getVacantes } from '../services/homeService.js';

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