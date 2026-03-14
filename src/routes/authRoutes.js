/* Rutas para el registro y login de usuarios */
import express from 'express';
import { formularioRegistro , register, formularioLogin, login, cerrarSesion } from '../controllers/authController.js';

const router = express.Router();

// Ruta para mostrar el formulario de registro
router.get('/register', formularioRegistro);

// Ruta para registrar un usuario
router.post('/register', register);

// Ruta para mostrar el formulario de login
router.get('/login', formularioLogin);

// Ruta para login de usuario
router.post('/login', login);

router.get('/logout', cerrarSesion)

export default router;
