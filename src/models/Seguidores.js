import { DataTypes } from 'sequelize';
import db from '../../config/db.js';

const Seguidores = db.define('seguidores', {
    // Las claves foráneas se definirán en las asociaciones
}, {
    timestamps: false
});

export default Seguidores;
