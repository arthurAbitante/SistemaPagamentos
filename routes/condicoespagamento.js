const express = require('express');
const router = express.Router();
const CondicoesPagamento = require('../models/CondicoesPagamento');

router.get('/', async (req, res) => {
    try {
        const condicoespagamento = await CondicoesPagamento.findAll();
        res.json(condicoespagamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const condicoespagamento = await CondicoesPagamento.create(req.body);
        res.status(201).json(condicoespagamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:condicoespagamentoId', async (req, res) => {
    const { condicoespagamentoId } = req.params;
    try {
        const [updated] = await CondicoesPagamento.update(req.body, {
            where: { condicoespagamentoId: condicoespagamentoId },
        });

        if (updated) {
            const updatedCondicoespagamento = await CondicoesPagamento.findOne({ where: { condicoespagamentoId: condicoespagamentoId } });
            res.json(updatedCondicoespagamento);
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:condicoespagamentoId', async (req, res) => {
    const { condicoespagamentoId } = req.params;
    try {
        const deleted = await CondicoesPagamento.destroy({
            where: { condicoespagamentoId: condicoespagamentoId },
        });

        if (deleted) {
            res.json({ message: 'condicoespagamento deleted successfully' });
        } else {
            res.status(404).json({ error: 'condicoespagamento not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
