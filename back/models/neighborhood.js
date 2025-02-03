// models/neighborhood.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect.js');

const Neighborhood = sequelize.define('Neighborhood', {
    idneighborhood: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    idcity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'neighborhood',
    timestamps: false,
});

// Aquí puedes agregar las relaciones si las necesitas
// Neighborhood.associate = (models) => {
//     Neighborhood.belongsTo(models.City, { foreignKey: 'idcity' });
// };

module.exports = Neighborhood;