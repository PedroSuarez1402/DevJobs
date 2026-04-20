import { DataTypes } from 'sequelize';
import db from '../../config/db.js';

const Vacantes = db.define('vacantes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    tipo_contrato: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.ENUM('abierta', 'cerrada'),
        defaultValue: 'abierta'
    },
    skills: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    visualizaciones: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true,

    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
});

export default Vacantes;
