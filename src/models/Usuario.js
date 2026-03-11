import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Usuario = db.define('usuarios',
    {
        nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        foto_perfil: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        resumen: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
);

export default Usuario;