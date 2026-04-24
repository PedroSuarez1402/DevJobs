import { Usuario, Vacantes, Postulaciones } from '../models/index.js';

export const panelPrincipal = async (req, res) => {
    try {
        const [totalUsuarios, totalVacantes, totalPostulaciones, ultimosUsuarios] = await Promise.all([
            Usuario.count(),
            Vacantes.count(),
            Postulaciones.count(),
            Usuario.findAll({
                limit: 5,
                order: [['id', 'DESC']],
                attributes: ['id', 'nombre', 'email', 'rol']
            })
        ]);

        res.render('admin/dashboard', {
            nombrePagina: 'SuperAdmin',
            tagline: 'Panel de Control',
            totalUsuarios,
            totalVacantes,
            totalPostulaciones,
            ultimosUsuarios
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'No se pudo cargar el panel de administración');
        res.redirect('/vacantes');
    }
};

