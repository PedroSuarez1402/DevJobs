/* Funcion para encriptar contraseñas */
import bcrypt from 'bcrypt';

export const encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}
/* Funcion para comparar contraseñas */

export const compararPassword = async (password, hash) => {
    const esValido = await bcrypt.compare(password, hash);
    return esValido;
}
