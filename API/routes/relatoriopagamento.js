const express = require('express');
const router = express.Router();
const RelatorioPagamento = require('../models/RelatorioPagamento');

router.get('/', async (req, res) => {
    try {
        const relatoriopagamento = await RelatorioPagamento.findAll();
        res.json(relatoriopagamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const relatoriopagamento = await RelatorioPagamento.create(req.body);
        res.status(201).json(relatoriopagamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:relatoriopagamentoId', async (req, res) => {
    const { relatoriopagamentoId } = req.params;
    try {
        const [updated] = await RelatorioPagamento.update(req.body, {
            where: { relatoriopagamentoId: relatoriopagamentoId },
        });

        if (updated) {
            const updatedRelatoriopagamento = await RelatorioPagamento.findOne({ where: { relatoriopagamentoId: relatoriopagamentoId } });
            res.json(updatedRelatoriopagamento);
        } else {
            res.status(404).json({ error: 'historicopreco not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:historicoprecoId', async (req, res) => {
    const { historicoprecoId } = req.params;
    try {
        const deleted = await HistoricoPreco.destroy({
            where: { historicoprecoId: historicoprecoId },
        });

        if (deleted) {
            res.json({ message: 'historicopreco deleted successfully' });
        } else {
            res.status(404).json({ error: 'historicopreco not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
