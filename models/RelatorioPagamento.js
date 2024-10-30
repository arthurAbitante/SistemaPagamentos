const {DataTypes} = require('sequelize');
const sequelize = require('../config/config');
const Cliente = require('./Cliente');
const CondicoesPagamento = require('./CondicoesPagamento');
const HistoricoPreco = require('./HistoricoPreco');

const RelatorioPagamento = sequelize.define('RelatorioPagamento', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    HistoricoPrecoid: {
        type: DataTypes.INTEGER,
        references: {
            model: HistoricoPreco,
            key: 'id',
        },
    },
    condicaoPagamentoId: {
        type: DataTypes.INTEGER,
        references: {
            model: CondicoesPagamento,
            key: 'condicaoPagamentoId',
        },
    },
    clienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'clienteId',
        },
    },
}, {timestamps: false});

RelatorioPagamento.belongsTo(Cliente, {foreignKey: 'clienteId'});
RelatorioPagamento.belongsTo(CondicoesPagamento, {foreignKey: 'condicaoPagamentoId'});
RelatorioPagamento.belongsTo(HistoricoPreco, {foreignKey: 'HistoricoPrecoid'});

module.exports = RelatorioPagamento;