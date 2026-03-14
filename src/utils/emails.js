import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transport.sendMail({
        from: 'DevJobs <admin@devjobs.com>',
        to: email,
        subject: 'Confirma tu cuenta en DevJobs',
        text: 'Confirma tu cuenta en DevJobs',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en DevJobs.</p>
            <p>Tu cuenta ya está casi lista, solo debes confirmarla haciendo clic en el siguiente enlace:</p>
            <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}">Confirmar Cuenta</a>
            <p>Si no creaste esta cuenta, ignora este mensaje.</p>
        `
    })
}