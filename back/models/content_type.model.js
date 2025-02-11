// models/content_type.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect.js');

const ContentType = sequelize.define('ContentType', {
  idcontent_type: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  filePath: {
    // Por ejemplo, para almacenar la ruta o URL del archivo
    type: DataTypes.STRING,
    allowNull: false
  },
  idpost: {
    // Si usas un id de publicación (opcional)
    type: DataTypes.INTEGER,
    allowNull: true
  },
  iduser: {
    // El usuario que sube el contenido
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idmarketplace: {
    // Relaciona el contenido con la publicación del marketplace
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'content_type',
  timestamps: false
});

module.exports = ContentType;
