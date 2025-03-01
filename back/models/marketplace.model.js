const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect.js');

const Marketplace = sequelize.define('Marketplace', {
    idbusiness: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_idneighborhood: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_status: {
        type: DataTypes.ENUM('available','sold'),
        defaultValue: 'available',
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT, // Usa TEXT en lugar de JSON para evitar errores de almacenamiento
        allowNull: true,
        
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    },
    // Fecha de creación (se establece automáticamente)
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull:false
    },
}, 
{
    tableName: 'marketplace', 
    timestamps: false,
});

module.exports = Marketplace;