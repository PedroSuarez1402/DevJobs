import { DataTypes } from 'sequelize';
import db from '../../config/db.js';

const Miembros_Canal = db.define('miembros_canal', {
    // Las claves foráneas se definirán en las asociaciones
}, {
    timestamps: false
});

export default Miembros_Canal;
