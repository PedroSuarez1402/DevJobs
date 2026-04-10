import express from 'express';
import { mostrarPerfil, formularioEditarPerfil, editarPerfil } from '../controllers/perfilController.js';
import { comprimirImagen, subirArchivosPerfil } from '../middlewares/subirArchivo.js';
import { protegerRuta } from '../middlewares/authMiddleware.js';

const router = express.Router();



router.get('/', protegerRuta, mostrarPerfil);
router.get('/editar', protegerRuta, formularioEditarPerfil);
router.post('/editar', protegerRuta, subirArchivosPerfil, comprimirImagen, editarPerfil);
router.get('/:id', protegerRuta, mostrarPerfil);

export default router;
