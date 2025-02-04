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
    last_name: {
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
        allowNull: true,
        defaultValue: 'Not specified' // 🔹 Valor por defecto
    },
    idneighborhood: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true,
        defaultValue: 0.0000000 // 🔹 Valor por defecto
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
        defaultValue: 0.00000000 // 🔹 Valor por defecto
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          len: [8, 20]
        }
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;