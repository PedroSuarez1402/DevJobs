/* Rutas para el registro y login de usuarios */
import express from 'express';
import { formularioRegistro , register, formularioLogin, login, cerrarSesion, confirmar, formularioOlvidePassword, olvidePassword, formularioReestablecerPassword, reestablecerPassword } from '../controllers/authController.js';

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

// Ruta para confirmar cuenta
router.get('/confirmar/:token', confirmar);

// Rutas para recuperar contraseña
router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', olvidePassword);

// Rutas para reestablecer contraseña
router.get('/reestablecer-password/:token', formularioReestablecerPassword);
router.post('/reestablecer-password/:token', reestablecerPassword);

export default router;
