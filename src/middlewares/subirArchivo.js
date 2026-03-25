import multer from "multer";
import path from "path";
import shortid from 'shortid';

const configuracionMulter = {
    limits: { fileSize: 5000000 }, // 5MB
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === 'foto_perfil') {
                cb(null, path.resolve('public/uploads/perfiles'));
            } else {
                cb(null, path.resolve('public/uploads/cvs'));
            }
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
        }
    }
}

const upload = multer(configuracionMulter).fields([
    { name: 'foto_perfil', maxCount: 1 },
    { name: 'cv_archivo', maxCount: 1 }
]);

export const subirArchivosPerfil = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            req.flash('error', error.message);
            return res.redirect('/perfil/editar');
        }
        next();
    });
}