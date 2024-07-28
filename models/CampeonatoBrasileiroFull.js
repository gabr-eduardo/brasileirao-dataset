const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconnection');

/**
 * Dados extraídos do repositório Brasileirao_Dataset de @adaoduque
 * <https://github.com/adaoduque/Brasileirao_Dataset>
*/

const CampeonatoBrasileiroFull = sequelize.define('CampeonatoBrasileiroFull', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    rodata: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    data: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mandante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visitante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    formacao_mandante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    formacao_visitante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tecnico_mandante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tecnico_visitante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vencedor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    arena: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mandante_Placar: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    visitante_Placar: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mandante_Estado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visitante_Estado: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'campeonato_brasileiro_full',
    timestamps: false
});

// não utilizar o modelo sync, o banco foi restaurado diretamente do csv

module.exports = CampeonatoBrasileiroFull;
