// Importamos los tipos de  datos de sequelize ( String, Integer, Text, Date, Enum, ForeignKey, etc)
import { DataTypes } from "sequelize";
// Importamos la conexion de bases de datos que interactua directamente
import db from "../../config/db.js";

// db.define define el nombre de la tabla y por dentro las columnas que va a tener
const Usuario = db.define('usuarios',
    {
        // Sequelize define la columna id automaticamente
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