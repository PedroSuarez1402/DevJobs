import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

const createTransport = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

const compileTemplate = (templateName, data) => {
    const __dirname = path.resolve();
    const templatePath = path.join(__dirname, 'views', 'emails', `${templateName}.handlebars`);
    const source = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(source);
    return template(data);
};

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;
    const transport = createTransport();
    const htmlCompilado = compileTemplate('confirmar-cuenta', {
        nombre: nombre,
        url: `${process.env.BACKEND_URL}/auth/confirmar/${token}`
    });

    await transport.sendMail({
        from: 'DevJobs <admin@devjobs.com>',
        to: email,
        subject: 'Confirma tu cuenta en DevJobs',
        text: 'Confirma tu cuenta en DevJobs',
        html: htmlCompilado 
    });
}

export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos;
    const transport = createTransport();
    const htmlCompilado = compileTemplate('olvide-password', {
        nombre: nombre,
        url: `${process.env.BACKEND_URL}/auth/reestablecer-password/${token}`
    });

    await transport.sendMail({
        from: 'DevJobs <admin@devjobs.com>',
        to: email,
        subject: 'Reestablece tu contraseña en DevJobs',
        text: 'Reestablece tu contraseña en DevJobs',
        html: htmlCompilado 
    });
}

export const emailConfirmacionPostulacion = async (datos) => {
    const { email, nombre, vacante } = datos;
    const transport = createTransport();
    const htmlCompilado = compileTemplate('confirmacion-postulacion', {
        nombre,
        vacante
    });

    await transport.sendMail({
        from: 'DevJobs <admin@devjobs.com>',
        to: email,
        subject: `Postulación exitosa: ${vacante}`,
        text: `Has postulado con éxito a la vacante: ${vacante}`,
        html: htmlCompilado 
    });
}

export const emailNotificacionEmpleador = async (datos) => {
    const { emailEmpleador, nombreEmpleador, nombreCandidato, vacante } = datos;
    const transport = createTransport();
    const htmlCompilado = compileTemplate('notificacion-empleador', {
        nombreEmpleador,
        nombreCandidato,
        vacante
    });

    await transport.sendMail({
        from: 'DevJobs <admin@devjobs.com>',
        to: emailEmpleador,
        subject: `Nueva postulación para: ${vacante}`,
        text: `Tienes una nueva postulación para tu vacante: ${vacante}`,
        html: htmlCompilado 
    });
}

export const emailPostulacionAceptada = async (datos) => {
    const { email, nombre, vacante } = datos;
    const transport = createTransport();
    const htmlCompilado = compileTemplate('postulacion-aceptada', {
        nombre,
        vacante
    });

    await transport.sendMail({
        from: 'DevJobs <admin@devjobs.com>',
        to: email,
        subject: `¡Tu postulación para ${vacante} ha sido aceptada!`,
        text: `Felicidades ${nombre}, tu postulación para ${vacante} ha sido aceptada.`,
        html: htmlCompilado 
    });
}
