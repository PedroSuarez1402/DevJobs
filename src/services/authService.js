/* Servicio de autenticacion */
import { encriptarPassword, compararPassword } from '../utils/passwords.js';
import Usuario from '../models/Usuario.js';
import { generarToken } from '../utils/token.js';
import { emailRegistro } from '../utils/emails.js';

/* Funcion logica para crear usuario */
export const crearUsuario = async (datosUsuario) => {
    const { nombre, email, password } = datosUsuario;
    /* Buscar el modelo usuario si el email ya existe */
    const existeUsuario = await Usuario.findOne({
        where: {
            email
        }
    })
    if(existeUsuario){
        throw new Error('El email ya está registrado');
    }else{
        /* Encriptar la contraseña */
        const passwordEncriptado = await encriptarPassword(password);
        const token = generarToken();
        /* Crear el usuario */
        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordEncriptado,
            token: token
        });

        await emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })
        return usuario;
    }
}
/* Funcion logica para login de usuario */
export const loginUsuario = async (datosUsuario) => {
    const { email, password } = datosUsuario;
    /* Buscar el modelo usuario si el email ya existe */
    const existeUsuario = await Usuario.findOne({
        where: {
            email
        }
    })
    if(!existeUsuario){
        throw new Error('El email no está registrado');
    }else{
        /* Comparar la contraseña */
        const passwordValido = await compararPassword(password, existeUsuario.password);
        if(!passwordValido){
            throw new Error('La contraseña es incorrecta');
        }else{
            return existeUsuario;
        }
    }
}
