const express = require('express');
const router = express.Router();

const InfoHeroe = require('../models/heroe');

router.get('/', async (req, res) => {
    const infoHeroes = await InfoHeroe.find();
    res.json(infoHeroes);
});

router.get('/:id', async (req, res) => {
    const infoHeroe = await InfoHeroe.findById(req.params.id);
    res.json(infoHeroe);
});

router.post('/', async (req, res) => {
    const { photo, nickname, name, description } = req.body;
    const infoHeroes = new InfoHeroe({photo, nickname, name, description});
    await infoHeroes.save();
    res.json({status: 'Heroe saved'});
});

router.put('/:id', async (req, res) => {
    const { photo, nickname, name, description } = req.body;
    const newInfo = { photo, nickname, name, description };
    await InfoHeroe.findByIdAndUpdate(req.params.id, newInfo);
    res.json({status: 'Heroe updated'});
});

router.delete('/:id', async (req, res) => {
    await InfoHeroe.findByIdAndRemove(req.params.id);
    res.json({status: 'Heroe removed'});
});

module.exports = router;