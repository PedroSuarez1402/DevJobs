import * as perfilService from '../services/perfilService.js';
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';

/* Mostrar el perfil del usuario */
export const mostrarPerfil = async (req, res) => {
    try {
        // Si hay un id en la URL lo usamos, si no usamos el del usuario logueado
        const usuarioId = req.params.id || req.session.usuario.id;
        const perfil = await perfilService.obtenerPerfilCompleto(usuarioId);

        if (!perfil || !perfil.usuario) {
            req.flash('error', 'El perfil solicitado no existe');
            return res.redirect('/');
        }

        const { usuario, cv } = perfil;
        
        // Verificar si el perfil que se está viendo es el del usuario logueado
        const esPerfilPropio = usuarioId == req.session.usuario.id;
        const volverAdmin = req.query?.from === 'admin' && req.session?.usuario?.rol === 'admin';

        res.render('perfil/perfil', {
            nombrePagina: esPerfilPropio ? 'Mi Perfil' : `Perfil: ${usuario.nombre}`,
            tagline: esPerfilPropio ? 'Gestiona tu información profesional y CV' : `Conoce la trayectoria de ${usuario.nombre}`,
            perfilUsuario: usuario,
            cv,
            esPerfilPropio,
            volverAdmin,
            mostrarNav: true
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Hubo un error al cargar el perfil');
        res.redirect('/');
    }
}

/* Mostrar formulario de edición de perfil */
export const formularioEditarPerfil = async (req, res) => {
    try {
        const { id } = req.session.usuario;
        const { usuario, cv } = await perfilService.obtenerPerfilCompleto(id);

        res.render('perfil/editar-perfil', {
            nombrePagina: 'Editar Perfil Profesional',
            tagline: 'Completa tu información para destacar ante los reclutadores',
            usuario,
            cv: cv || {},
            mostrarNav: true
        });
    } catch (error) {
        console.error(error);
        res.redirect('/perfil');
    }
}

/* Guardar cambios del perfil y CV */
export const editarPerfil = async (req, res) => {
    console.log('--- INICIO CONTROLADOR EDITAR PERFIL ---');
    try {
        const { id } = req.session.usuario;
        
        console.log('Archivos recibidos:', req.files);
        console.log('Cuerpo recibido:', req.body);

        const { usuario, cv } = await perfilService.actualizarPerfilYCV(id, req.body, req.files);

        // Actualizar la sesión con los nuevos datos del usuario
        req.session.usuario.nombre = usuario.nombre;
        req.session.usuario.foto_perfil = usuario.foto_perfil;

        req.flash('exito', 'Perfil actualizado correctamente');
        res.redirect('/perfil');

    } catch (error) {
        console.error("Fallo en actualización de perfil:", error);
        
        // Registrar detalles si es un error de Multer o Sequelize
        if (error.code) console.error("Código de error:", error.code);
        if (error.storageErrors) console.error("Errores de almacenamiento:", error.storageErrors);

        req.flash('error', error.message || 'No se pudo actualizar el perfil');
        res.redirect('/perfil/editar');
    }
}

export const exportarPDF = async (req, res) => {
    let browser;
    try {
        const { id } = req.session.usuario;
        const { usuario, cv } = await perfilService.obtenerPerfilCompleto(id);

        const forwardedProto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
        const forwardedHost = String(req.headers['x-forwarded-host'] || '').split(',')[0].trim();
        const proto = forwardedProto || req.protocol;
        const host = forwardedHost || req.get('host');
        const baseUrl = (process.env.APP_URL || `${proto}://${host}`).replace(/\/$/, '');

        let css = '';
        try {
            css = await fs.readFile(new URL('../../public/dist/app.css', import.meta.url), 'utf8');
        } catch (_) {}

        let fotoPerfilSrc = null;
        if (usuario.foto_perfil) {
            try {
                const fotoFileUrl = new URL(`../../public/uploads/perfiles/${usuario.foto_perfil}`, import.meta.url);
                const fotoBuffer = await fs.readFile(fotoFileUrl);
                const fileName = String(usuario.foto_perfil).toLowerCase();
                const mime =
                    fileName.endsWith('.png')
                        ? 'image/png'
                        : fileName.endsWith('.webp')
                          ? 'image/webp'
                          : 'image/jpeg';
                fotoPerfilSrc = `data:${mime};base64,${fotoBuffer.toString('base64')}`;
            } catch (_) {
                fotoPerfilSrc = `${baseUrl}/uploads/perfiles/${usuario.foto_perfil}`;
            }
        }

        const parseSkills = (value) => {
            if (!value) return [];
            try {
                const parsed = JSON.parse(value);
                if (Array.isArray(parsed)) {
                    return parsed.map((x) => (typeof x === 'string' ? x : x?.value)).filter(Boolean);
                }
            } catch (_) {}
            return String(value)
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
        };

        const skillsUsuario = parseSkills(usuario.skills);

        const html = await new Promise((resolve, reject) => {
            res.render(
                'perfil/cv-pdf',
                {
                    layout: false,
                    usuario,
                    cv: cv || {},
                    baseUrl,
                    css,
                    fotoPerfilSrc,
                    skillsUsuario
                },
                (err, str) => {
                    if (err) reject(err);
                    else resolve(str);
                }
            );
        });

        const launchOptions = {
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        };
        if (process.env.PUPPETEER_EXECUTABLE_PATH) {
            launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
        }

        try {
            browser = await puppeteer.launch(launchOptions);
        } catch (_) {
            browser = await puppeteer.launch({ ...launchOptions, headless: true });
        }

        const page = await browser.newPage();
        page.setDefaultTimeout(30000);
        page.setDefaultNavigationTimeout(30000);
        await page.emulateMediaType('screen');
        await page.setContent(html, { waitUntil: 'load' });

        const buffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: '18mm',
                right: '14mm',
                bottom: '18mm',
                left: '14mm'
            }
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="CV_DevJobs.pdf"');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        req.flash('error', 'No se pudo generar el PDF del CV');
        res.redirect('/perfil');
    } finally {
        if (browser) {
            try {
                await browser.close();
            } catch (_) {}
        }
    }
}
