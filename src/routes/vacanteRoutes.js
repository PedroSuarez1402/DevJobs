import express from 'express';
import { protegerRuta } from '../middlewares/authMiddleware.js';
import { formularioNuevaVacante, Vacantes } from '../controllers/vacantesController.js';

const router = express.Router();

/* Ruta para ver vacantes */
router.get('/', protegerRuta, Vacantes)
router.get('/nueva', protegerRuta, formularioNuevaVacante)

export default router;