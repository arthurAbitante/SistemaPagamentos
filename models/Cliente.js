const {DataTypes} = require('sequelize');
const sequelize = require('../config/config');

const Cliente = sequelize.define('Cliente', {
    clienteId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cnpj: DataTypes.STRING,
    razaoSocial: DataTypes.STRING,
    email: DataTypes.TEXT,
}, {timestamps: false});

module.exports = Cliente;

