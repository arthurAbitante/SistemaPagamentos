const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:produtoId', async (req, res) => {
    const { produtoId } = req.params;
    try {
        const [updated] = await Produto.update(req.body, {
            where: { produtoId: produtoId },
        });

        if (updated) {
            const updatedProduto = await Produto.findOne({ where: { produtoId: produtoId } });
            res.json(updatedProduto);
        } else {
            res.status(404).json({ error: 'Produto not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:produtoId', async (req, res) => {
    const { produtoId } = req.params;
    try {
        const deleted = await Produto.destroy({
            where: { produtoId: produtoId },
        });

        if (deleted) {
            res.json({ message: 'Produto deleted successfully' });
        } else {
            res.status(404).json({ error: 'Produto not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
