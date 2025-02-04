const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect.js');

const Neighborhood = sequelize.define('Neighborhood', {
    idneighborhood: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    latitude: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    idcity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Neighborhood',
    timestamps: false
});

module.exports = Neighborhood;