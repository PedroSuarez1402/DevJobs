const verificarAdmin = (req, res, next) => {
    if (req.session?.usuario?.rol === 'admin') {
        return next();
    }

    req.flash('error', 'Acceso denegado');
    return res.redirect('/vacantes');
};

export default verificarAdmin;
