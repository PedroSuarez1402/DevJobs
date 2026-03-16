/* Importaciones */
import { confirmarCuenta, crearUsuario, loginUsuario } from '../services/authService.js'; // Importamos el servicio de autenticacion

/* Funcion para mostrar el formulario de registrarse */
export const formularioRegistro = (req, res) => {
    res.render('auth/register', {
        nombrePagina: 'Registro de Usuario',
        tagline: 'Crea tu cuenta en devJobs',
        mostrarNav: false,
        centrarContenido: true,
        ocultarBotonesAuth: true
    })
}
/* Funcion para registrarse en la aplicacion usando el service */
export const register = async (req, res) => {
    try {
        const { nombre, email, password, confirmarPassword } = req.body;
        /* Validar que los campos esten completos */
        if(!nombre || !email || !password || !confirmarPassword){
            throw new Error('Todos los campos son obligatorios');
        }
        /* Validar que la contraseña y la confirmacion de contraseña coincidan */
        if(password !== confirmarPassword){
            throw new Error('Las contraseñas no coinciden');
        }

        const usuario = await crearUsuario({
            nombre,
            email,
            password
        });
        /* Respuesta de exito */
        req.flash('exito', 'Cuenta creada correctamente');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/auth/register');
    }
}
/* Funcion para mostrar el formulario de login */
export const formularioLogin = (req, res) => {
    res.render('auth/login', {
        nombrePagina: 'Iniciar Sesión',
        tagline: 'Accede a tu cuenta en devJobs',
        mostrarNav: false,
        centrarContenido: true,
        ocultarBotonesAuth: true
    })
}
/* Funcion para login en la aplicacion usando el service */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        /* Validar que los campos esten completos */
        if(!email || !password){
            throw new Error('Todos los campos son obligatorios');
        }
        /* Validar que el usuario exista */
        const usuario = await loginUsuario({
            email,
            password
        });
        /* Guardar la sesion */
        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            foto_perfil: usuario.foto_perfil
        }
        /* Respuesta de exito */
        req.flash('exito', 'Inicio de sesión correctamente');
        res.redirect('/');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/auth/login');
    }
}

export const cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

export const confirmar = async (req, res) => {
    try {
        const { token } = req.params;

        await confirmarCuenta(token);
        req.flash('exito', '¡Cuenta confirmada Correctamente! Ya puedes iniciar sesion.');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/auth/register');
    }
}
