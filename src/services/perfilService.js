import { Usuario, CVs } from '../models/index.js';

/**
 * Obtiene la información completa de un usuario y su CV
 */
export const obtenerPerfilCompleto = async (usuarioId) => {
    const usuario = await Usuario.findByPk(usuarioId, {
        include: [
            { model: CVs }
        ]
    });

    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    const usuarioData = usuario.toJSON();
    const cv = usuario.cvs && usuario.cvs.length > 0 ? usuario.cvs[0].toJSON() : null;

    if (cv) {
        cv.experiencia = cv.experiencia ? JSON.parse(cv.experiencia) : [];
        cv.educacion = cv.educacion ? JSON.parse(cv.educacion) : [];
        cv.skills_tecnicas = cv.skills_tecnicas ? cv.skills_tecnicas.split(',') : [];
        cv.skills_blandas = cv.skills_blandas ? cv.skills_blandas.split(',') : [];
    }

    return { usuario: usuarioData, cv };
};

/**
 * Procesa y guarda los cambios del perfil y CV
 */
export const actualizarPerfilYCV = async (usuarioId, datos, archivos) => {
    const { 
        nombre, titular, resumen, github, telefono, 
        skills_tecnicas, skills_blandas, 
        exp_cargo, exp_empresa, exp_inicio, exp_fin, exp_logros, 
        edu_titulo, edu_inst, edu_anio
    } = datos;

    // 1. Actualizar datos básicos del Usuario
    const usuario = await Usuario.findByPk(usuarioId);
    usuario.nombre = nombre;
    
    if (archivos && archivos.foto_perfil) {
        usuario.foto_perfil = archivos.foto_perfil[0].filename;
    }
    await usuario.save();

    // 2. Gestionar la Experiencia
    let experienciaArr = [];
    if (Array.isArray(exp_cargo)) {
        experienciaArr = exp_cargo.map((cargo, i) => ({
            cargo,
            empresa: exp_empresa[i],
            inicio: exp_inicio[i],
            fin: exp_fin[i],
            logros: exp_logros[i]
        }));
    } else if (exp_cargo) {
        experienciaArr.push({ 
            cargo: exp_cargo, 
            empresa: exp_empresa, 
            inicio: exp_inicio, 
            fin: exp_fin, 
            logros: exp_logros 
        });
    }

    // 3. Gestionar la Educación
    let educacionArr = [];
    if (Array.isArray(edu_titulo)) {
        educacionArr = edu_titulo.map((titulo, i) => ({
            titulo,
            institucion: edu_inst[i],
            anio: edu_anio[i]
        }));
    } else if (edu_titulo) {
        educacionArr.push({ 
            titulo: edu_titulo, 
            institucion: edu_inst, 
            anio: edu_anio 
        });
    }

    // 4. Buscar o crear el CV
    let [cv, created] = await CVs.findOrCreate({
        where: { usuario_id: usuarioId },
        defaults: { tipo: 'generado' }
    });

    // 5. Actualizar campos del CV
    cv.titular = titular;
    cv.resumen = resumen;
    cv.github = github;
    cv.telefono = telefono;
    cv.skills_tecnicas = skills_tecnicas;
    cv.skills_blandas = skills_blandas;
    cv.experiencia = JSON.stringify(experienciaArr);
    cv.educacion = JSON.stringify(educacionArr);
    cv.tipo = 'generado';

    if (archivos && archivos.cv_archivo) {
        cv.url_archivo = archivos.cv_archivo[0].filename;
        cv.tipo = 'archivo';
    }

    await cv.save();
    return { usuario, cv };
};
