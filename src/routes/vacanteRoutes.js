import express from 'express';
import { protegerRuta } from '../middlewares/authMiddleware.js';
import { formularioNuevaVacante, Vacantes, crearVacante } from '../controllers/vacantesController.js';

const router = express.Router();

/* Ruta para ver vacantes */
router.get('/', protegerRuta, Vacantes)
router.get('/nueva', protegerRuta, formularioNuevaVacante)
router.post('/nueva', protegerRuta, crearVacante);

export default router;