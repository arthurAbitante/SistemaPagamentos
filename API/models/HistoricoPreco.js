const {DataTypes} = require('sequelize');
const sequelize = require('../config/config');
const Produto = require('./Produto');

const HistoricoPreco = sequelize.define('HistoricoPreco', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ProdutoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Produto,
            key: 'Id',
        },
    },
    preco: DataTypes.DOUBLE,
}, {timestamps: false});

HistoricoPreco.belongsTo(Produto, {foreignKey: 'ProdutoId'});

module.exports = HistoricoPreco;