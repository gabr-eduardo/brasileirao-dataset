const express = require("express");
const router = express.Router();
const path = require('path');
const controller = require("../controllers/controllerCampeonatoBrasileiroFull");

router.get('/', (req, res) => { // página inicial com a documentação da api
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/jogos', controller.getAll); // retorna todos os jogos

router.get('/jogos/:id', controller.getById); // retorna o jogo com o id correspondente

router.get('/jogos/data/:start/:end', controller.getByData); // retorna os jogos em um intervalo de datas

router.get('/jogos/confronto/:time1/:time2/:datainicio?/:datafim?', controller.getByConfronto); // retorna os jogos pelo confronto e (caso enviadas) datas

router.get('/jogos/time/:time/:datainicio?/:datafim?', controller.getByTimeAndData); // retorna os jogos pelo time e (caso enviadas) datas

module.exports = router;
