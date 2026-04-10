import multer from "multer";
import path from "path";
import fs from "fs";
import shortid from 'shortid';
import sharp from "sharp";

const configuracionMulter = {
    limits: { fileSize: 15000000 }, // 15MB
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const folder = file.fieldname === 'foto_perfil' 
                ? 'public/uploads/perfiles' 
                : 'public/uploads/cvs';
            
            const fullPath = path.resolve(folder);
            
            // Garantizar que la carpeta exista recursivamente
            fs.mkdirSync(fullPath, { recursive: true });
            
            cb(null, fullPath);
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'foto_perfil') {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(new Error('Formato de imagen no válido (solo JPG/PNG)'), false);
            }
        } else if (file.fieldname === 'cv_archivo') {
            if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                cb(null, true);
            } else {
                cb(new Error('Formato de CV no válido (solo PDF/Word)'), false);
            }
        } else {
            cb(null, true);
        }
    }
}

const upload = multer(configuracionMulter).fields([
    { name: 'foto_perfil', maxCount: 1 },
    { name: 'cv_archivo', maxCount: 1 }
]);

export const subirArchivosPerfil = (req, res, next) => {
    console.log('--- INICIO MIDDLEWARE MULTER ---');
    console.log('Method:', req.method);
    console.log('Content-Type:', req.headers['content-type']);
    
    upload(req, res, function(error) {
        if (error) {
            console.error('Error de Multer:', error);
            req.flash('error', error.message);
            return res.redirect('/perfil/editar');
        }
        console.log('--- FIN MIDDLEWARE MULTER (EXITO) ---');
        next();
    });
}

export const comprimirImagen = async (req, res, next) => {
    if (!req.files || !req.files['foto_perfil']) {
        return next();
    }

    const foto = req.files['foto_perfil'][0];
    const filePath = foto.path;
    
    // Vamos a convertirla a WebP (El formato más optimizado para web)
    const nombreOptimizado = `${foto.filename.split('.')[0]}.webp`;
    const outputPath = path.resolve('public/uploads/perfiles', nombreOptimizado);

    try {
        await sharp(filePath)
            .resize(400, 400, { fit: 'cover' }) // Recorta a un cuadrado perfecto de 400x400
            .webp({ quality: 80 })              // Comprime al 80% de calidad en formato WebP
            .toFile(outputPath);

        // Eliminamos la imagen original (la pesada de 15MB)
        fs.unlinkSync(filePath);

        // Actualizamos el objeto de Multer para que el controlador (perfilService)
        // guarde el nuevo nombre ".webp" en la base de datos
        req.files['foto_perfil'][0].filename = nombreOptimizado;

        next();
    } catch (error) {
        console.error("Error al comprimir la imagen con Sharp:", error);
        req.flash('error', 'Hubo un error al procesar tu foto de perfil.');
        return res.redirect('/perfil/editar');
    }
}