import express from 'express';
import { protegerRuta } from '../middlewares/authMiddleware.js';
import { 
    formularioNuevaVacante, Vacantes, crearVacante, verVacante, 
    misVacantes, editarVacante, eliminarVacante, formularioEditarVacante, 
    verDetallesMisVacantes, cerrarVacante 
} from '../controllers/vacantesController.js';

const router = express.Router();

router.get('/', protegerRuta, Vacantes);
router.get('/nueva', protegerRuta, formularioNuevaVacante);
router.post('/nueva', protegerRuta, crearVacante);
router.get('/mis-vacantes', protegerRuta, misVacantes);
router.get('/mis-vacantes/:id', protegerRuta, verDetallesMisVacantes);

// NUEVA RUTA:
router.post('/mis-vacantes/cerrar/:id', protegerRuta, cerrarVacante);

router.get('/editar/:id', protegerRuta, formularioEditarVacante);
router.post('/editar/:id', protegerRuta, editarVacante);
router.post('/eliminar/:id', protegerRuta, eliminarVacante);
router.get('/:id', protegerRuta, verVacante);

export default router;