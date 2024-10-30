const express = require('express');
const router = express.Router();
const HistoricoPreco = require('../models/HistoricoPreco');

router.get('/', async (req, res) => {
    try {
        const historicopreco = await HistoricoPreco.findAll();
        res.json(historicopreco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const historicopreco = await HistoricoPreco.create(req.body);
        res.status(201).json(historicopreco);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:historicoprecoId', async (req, res) => {
    const { historicoprecoId } = req.params;
    try {
        const [updated] = await HistoricoPreco.update(req.body, {
            where: { historicoprecoId: historicoprecoId },
        });

        if (updated) {
            const updatedHistoricopreco = await HistoricoPreco.findOne({ where: { historicoprecoId: historicoprecoId } });
            res.json(updatedHistoricopreco);
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
