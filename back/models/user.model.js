const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect.js');

const User = sequelize.define('User', {
    iduser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    last_name: {  // 🔹 Cambiado a last_name para coincidir con la BD
        type: DataTypes.STRING(45),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    gender: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    idneighborhood: {  // 🔹 Asegurado de que coincide con la BD
        type: DataTypes.INTEGER,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 7),  // 🔹 Tipo de dato corregido
        allowNull: true
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 8),  // 🔹 Tipo de dato corregido
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'user', // 🔹 Asegurar que Sequelize use el nombre correcto
    timestamps: false
});

module.exports = User;
