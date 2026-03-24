import express from 'express';
import { protegerRuta } from '../middlewares/authMiddleware.js';
import { formularioNuevaVacante, Vacantes, crearVacante, verVacante, misVacantes, editarVacante, eliminarVacante, formularioEditarVacante } from '../controllers/vacantesController.js';

const router = express.Router();

/* Ruta para ver vacantes */
router.get('/', protegerRuta, Vacantes);
router.get('/nueva', protegerRuta, formularioNuevaVacante);
router.post('/nueva', protegerRuta, crearVacante);
router.get('/mis-vacantes', protegerRuta, misVacantes);
router.get('/editar/:id', protegerRuta, formularioEditarVacante);
router.post('/editar/:id', protegerRuta, editarVacante);
router.post('/eliminar/:id', protegerRuta, eliminarVacante);

router.get('/:id', protegerRuta, verVacante);

export default router;