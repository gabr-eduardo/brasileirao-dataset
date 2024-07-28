const { Op } = require('sequelize'); // importa as operações
const CampeonatoBrasileiroFull = require('../models/CampeonatoBrasileiroFull');

const controller = {};

controller.getAll = async (req, res) => { // busca todos os jogos
    try {
        let jogos = await CampeonatoBrasileiroFull.findAll();
        res.status(200).json(jogos);
    } catch (error) {
        res.status(500).json(error); // erro de servidor, deveria obter dados
    }
};

controller.getById = async (req, res) => { // busca o jogo pelo id
    try {
        const jogo = await CampeonatoBrasileiroFull.findByPk(req.params.id);
        if (jogo != null) {
            res.status(200).json(jogo);
        } else {
            res.status(404).json({ error: "Nenhum jogo encontrado para o id fornecido." });
        }
    } catch (error) {
        res.status(422).json("Ocorreu um erro ao buscar o jogo. " + error);
    }
};

controller.getByData = async (req, res) => {
    try {
        const { start, end } = req.params;

        if (!start || !end) {
            return res.status(400).json({ error: "Os parâmetros 'start' e 'end' são obrigatórios." });
        }

        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: "As datas fornecidas são inválidas." });
        }

        if (startDate > endDate) {
            return res.status(400).json({ error: "A data de início não pode ser maior que a data final." });
        }

        const jogos = await CampeonatoBrasileiroFull.findAll({
            where: {
                data: {
                    [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
                }
            }
        });

        if (jogos.length > 0) {
            res.status(200).json(jogos);
        } else {
            res.status(404).json({ error: "Nenhum jogo encontrado para o intervalo de datas fornecido." });
        }
    } catch (error) {
        res.status(422).json({ error: "Ocorreu um erro ao buscar os jogos.", details: error.message });
    }
};

controller.getByConfronto = async (req, res) => {
    try {
        const { time1, time2, datainicio, datafim } = req.params;
        const query = {
            [Op.or]: [
                {
                    mandante: time1,
                    visitante: time2
                },
                {
                    mandante: time2,
                    visitante: time1
                }
            ]
        };

        if (datainicio && datafim) { // verifica se as datas foram recebidas para incluir na busca
            const startDate = new Date(datainicio);
            const endDate = new Date(datafim);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return res.status(400).json({ error: "As datas fornecidas são inválidas." });
            }

            if (startDate > endDate) {
                return res.status(400).json({ error: "A data de início não pode ser maior que a data final." });
            }

            query.data = {
                [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
            };
        }

        const jogos = await CampeonatoBrasileiroFull.findAll({
            where: query
        });

        if (jogos.length > 0) {
            res.status(200).json(jogos);
        } else {
            res.status(404).json({ error: "Nenhum jogo encontrado para o confronto e intervalo de datas fornecidos." });
        }
    } catch (error) {
        res.status(422).json({ error: "Ocorreu um erro ao buscar os jogos.", details: error.message });
    }
};

controller.getByTimeAndData = async (req, res) => {
    try {
        const { time, datainicio, datafim } = req.params;
        const query = {
            [Op.or]: [
                {
                    mandante: time
                },
                {
                    visitante: time
                }
            ]
        };

        if (datainicio && datafim) {
            const startDate = new Date(datainicio);
            const endDate = new Date(datafim);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return res.status(400).json({ error: "As datas fornecidas são inválidas." });
            }

            if (startDate > endDate) {
                return res.status(400).json({ error: "A data de início não pode ser maior que a data final." });
            }

            query.data = {
                [Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
            };
        }

        const jogos = await CampeonatoBrasileiroFull.findAll({
            where: query
        });

        if (jogos.length > 0) {
            res.status(200).json(jogos);
        } else {
            res.status(404).json({ error: "Nenhum jogo encontrado para o mandante e intervalo de datas fornecidos." });
        }
    } catch (error) {
        res.status(422).json({ error: "Ocorreu um erro ao buscar os jogos.", details: error.message });
    }
};

module.exports = controller;
