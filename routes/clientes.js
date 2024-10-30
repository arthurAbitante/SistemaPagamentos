const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:clienteId', async (req, res) => {
    const { clienteId } = req.params;
    try {
        const [updated] = await Cliente.update(req.body, {
            where: { clienteId: clienteId },
        });

        if (updated) {
            const updatedCliente = await Cliente.findOne({ where: { clienteId: clienteId } });
            res.json(updatedCliente);
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:clienteId', async (req, res) => {
    const { clienteId } = req.params;
    try {
        const deleted = await Cliente.destroy({
            where: { clienteId: clienteId },
        });

        if (deleted) {
            res.json({ message: 'Client deleted successfully' });
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
