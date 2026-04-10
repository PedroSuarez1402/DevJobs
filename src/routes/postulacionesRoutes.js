import express from 'express';
import { protegerRuta } from '../middlewares/authMiddleware.js';
import { postularAVacante, verMisPostulaciones } from '../controllers/postulacionesController.js';

const router = express.Router();

// Ruta POST para postularse (Recibe el ID de la vacante en la URL)
router.post('/nueva/:id', protegerRuta, postularAVacante);
/* Ruta para ver mis postulaciones */
router.get('/mis-postulaciones', protegerRuta, verMisPostulaciones);

export default router;