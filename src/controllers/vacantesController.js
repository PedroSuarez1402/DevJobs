export const formularioNuevaVacante = (req, res) => {
    res.render('vacantes/nueva', {
        nombre: req.session.usuario.nombre,
        email: req.session.usuario.email,
        foto_perfil: req.session.usuario.foto_perfil
    });
}