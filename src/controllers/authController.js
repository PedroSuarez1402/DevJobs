/* Importaciones */
import { confirmarCuenta, crearUsuario, loginUsuario, olvidePassword as olvidePasswordService, comprobarToken, nuevoPassword } from '../services/authService.js'; // Importamos el servicio de autenticacion

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
        req.flash('exito', 'Hemos enviado un correo de confirmación, por favor revisa tu bandeja de entrada');
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

/* Funcion para mostrar el formulario de olvide password */
export const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        nombrePagina: 'Recuperar Contraseña',
        tagline: 'Recupera el acceso a tu cuenta en devJobs',
        mostrarNav: false,
        centrarContenido: true,
        ocultarBotonesAuth: true
    })
}

/* Funcion para enviar el correo de recuperacion */
export const olvidePassword = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email){
            throw new Error('El email es obligatorio');
        }

        await olvidePasswordService(email);
        req.flash('exito', 'Hemos enviado un correo con las instrucciones a tu bandeja de entrada');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/auth/olvide-password');
    }
}

/* Funcion para mostrar el formulario de reestablecer password */
export const formularioReestablecerPassword = async (req, res) => {
    try {
        const { token } = req.params;
        await comprobarToken(token);
        res.render('auth/reestablecer-password', {
            nombrePagina: 'Reestablecer Contraseña',
            tagline: 'Coloca tu nueva contraseña en devJobs',
            mostrarNav: false,
            centrarContenido: true,
            ocultarBotonesAuth: true
        })
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/auth/login');
    }
}

/* Funcion para guardar la nueva contraseña */
export const reestablecerPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmarPassword } = req.body;

        if(!password || !confirmarPassword){
            throw new Error('Todos los campos son obligatorios');
        }

        if(password !== confirmarPassword){
            throw new Error('Las contraseñas no coinciden');
        }

        await nuevoPassword(token, password);
        req.flash('exito', 'Contraseña actualizada correctamente. Ya puedes iniciar sesión.');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/auth/reestablecer-password/${req.params.token}`);
    }
}
