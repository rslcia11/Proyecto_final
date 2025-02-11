// models/marketplace.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect.js');

const Marketplace = sequelize.define('Marketplace', {
  idmarketplace: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  idbusiness: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('available', 'sold out'),
    allowNull: false,
    defaultValue: 'available'
  }
}, {
  tableName: 'marketplace',
  timestamps: false
});

module.exports = Marketplace;
