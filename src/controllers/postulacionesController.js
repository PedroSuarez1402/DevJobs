import { verificarCV, verificarPostulacionPrevia, verificarPropietarioVacante, crearPostulacionDb } from '../services/postulacionesService.js'

export const postularAVacante = async (req, res) => {
    try {
        const vacante_id = req.params.id;
        const candidato_id = req.session.usuario.id;

        const esPropietario = await verificarPropietarioVacante(candidato_id, vacante_id);
        if (esPropietario) {
            req.flash('error', 'No puedes postular a tu propia vacante');
            return res.redirect(`/vacantes/${vacante_id}`);
        }

        const postulacionPrevia = await verificarPostulacionPrevia(candidato_id, vacante_id);
        if (postulacionPrevia) {
            req.flash('error', 'Ya has postulado a esta vacante');
            return res.redirect(`/vacantes/${vacante_id}`);
        }

        const tieneCV = await verificarCV(candidato_id);
        if (!tieneCV) {
            req.flash('error', 'Debes subir o crear tu Hoja de Vida en tu perfil antes de postularte.');
            return res.redirect('/perfil/editar');
        }
    } catch (error) {
        console.error("Error al postular a la vacante:", error);
        req.flash('error', 'Error al postular a la vacante');
        res.redirect(`/vacantes/${vacante_id}`);
    }
}