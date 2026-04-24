import express from 'express';
import {
    panelPrincipal,
    listarUsuarios,
    suspenderUsuario,
    reactivarUsuario,
    listarVacantes,
    cerrarVacante,
    abrirVacante,
    listarPostulaciones,
    rechazarPostulacion,
    restablecerPostulacion
} from '../controllers/adminController.js';
import { protegerRuta } from '../middlewares/authMiddleware.js';
import verificarAdmin from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.use(protegerRuta);
router.use(verificarAdmin);

router.get('/', panelPrincipal);
router.get('/usuarios', listarUsuarios);
router.post('/usuarios/:id/suspender', suspenderUsuario);
router.post('/usuarios/:id/reactivar', reactivarUsuario);

router.get('/vacantes', listarVacantes);
router.post('/vacantes/:id/cerrar', cerrarVacante);
router.post('/vacantes/:id/abrir', abrirVacante);

router.get('/postulaciones', listarPostulaciones);
router.post('/postulaciones/:id/rechazar', rechazarPostulacion);
router.post('/postulaciones/:id/restablecer', restablecerPostulacion);

export default router;
