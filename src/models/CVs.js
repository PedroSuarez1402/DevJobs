import { DataTypes } from 'sequelize';
import db from '../../config/db.js';

const CVs = db.define('cvs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.ENUM('archivo', 'generado'),
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url_archivo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

export default CVs;
