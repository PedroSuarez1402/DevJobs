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
        allowNull: false,
        defaultValue: 'generado'
    },
    titular: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    experiencia: {
        type: DataTypes.TEXT, // Almacenaremos JSON stringificado para múltiples entradas
        allowNull: true
    },
    educacion: {
        type: DataTypes.TEXT, // Almacenaremos JSON stringificado
        allowNull: true
    },
    skills_tecnicas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    skills_blandas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    github: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
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
