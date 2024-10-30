const {DataTypes} = require('sequelize');
const sequelize = require('../config/config');

const CondicoesPagamento = sequelize.define('CondicoesPagamento', {
    condicaoPagamentoId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    descricao: DataTypes.STRING,
    dias: DataTypes.STRING,
}, {timestamps: false});

module.exports = CondicoesPagamento;