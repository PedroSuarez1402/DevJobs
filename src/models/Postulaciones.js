import { DataTypes } from 'sequelize';
import db from '../../config/db.js';

const Postulaciones = db.define('postulaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_postulacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aceptado', 'rechazado'),
        defaultValue: 'pendiente'
    }
}, {
    timestamps: false
});

export default Postulaciones;
