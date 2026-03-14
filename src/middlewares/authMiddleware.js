export const protegerRuta = (req, res, next) => {
    if(req.session.usuario){
        return next();
    }

    req.flash('error', 'No tienes permisos para acceder a esta página');
    res.redirect('/auth/login');
}