import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

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

    const __dirname = path.resolve();
    const templatePath = path.join(__dirname, 'views', 'emails', 'confirmar-cuenta.handlebars');

    const source = fs.readFileSync(templatePath, 'utf8');

    const template = Handlebars.compile(source);

    const htmlCompilado = template({
        nombre: nombre,
        url: `${process.env.BACKEND_URL}/auth/confirmar/${token}`
    });

    await transport.sendMail({
        from: 'DevJobs <admin@devjobs.com>',
        to: email,
        subject: 'Confirma tu cuenta en DevJobs',
        text: 'Confirma tu cuenta en DevJobs', // Texto plano por si el gestor de correo no soporta HTML
        html: htmlCompilado 
    });
}