import Usuario from './Usuario.js';
import Vacantes from './Vacantes.js';
import CVs from './CVs.js';
import Postulaciones from './Postulaciones.js';
import Canales from './Canales.js';
import Posts from './Posts.js';
import Miembros_Canal from './Miembros_Canal.js';
import Seguidores from './Seguidores.js';

// Relaciones 1:N
Usuario.hasMany(CVs, { foreignKey: 'usuario_id' });
CVs.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.hasMany(Vacantes, { foreignKey: 'empleador_id' });
Vacantes.belongsTo(Usuario, { foreignKey: 'empleador_id' });

Usuario.hasMany(Postulaciones, { foreignKey: 'candidato_id' });
Postulaciones.belongsTo(Usuario, { foreignKey: 'candidato_id' });

Vacantes.hasMany(Postulaciones, { foreignKey: 'vacante_id' });
Postulaciones.belongsTo(Vacantes, { foreignKey: 'vacante_id' });

Usuario.hasMany(Canales, { foreignKey: 'creador_id' });
Canales.belongsTo(Usuario, { foreignKey: 'creador_id' });

Usuario.hasMany(Posts, { foreignKey: 'autor_id' });
Posts.belongsTo(Usuario, { foreignKey: 'autor_id' });

Canales.hasMany(Posts, { foreignKey: 'canal_id' });
Posts.belongsTo(Canales, { foreignKey: 'canal_id' });

// Relaciones N:M
Usuario.belongsToMany(Canales, { through: Miembros_Canal, foreignKey: 'usuario_id' });
Canales.belongsToMany(Usuario, { through: Miembros_Canal, foreignKey: 'canal_id' });

// Relación de Seguidores (Autorreferencial)
Usuario.belongsToMany(Usuario, { 
    as: 'seguidores', 
    through: Seguidores, 
    foreignKey: 'seguido_id', 
    otherKey: 'seguidor_id' 
});

Usuario.belongsToMany(Usuario, { 
    as: 'siguiendo', 
    through: Seguidores, 
    foreignKey: 'seguidor_id', 
    otherKey: 'seguido_id' 
});

export {
    Usuario,
    Vacantes,
    CVs,
    Postulaciones,
    Canales,
    Posts,
    Miembros_Canal,
    Seguidores
};
