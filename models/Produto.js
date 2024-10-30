const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Produto = sequelize.define('Produto', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Sku: DataTypes.STRING,
    Descricao: DataTypes.STRING,
}, { timestamps: false });

module.exports = Produto;
