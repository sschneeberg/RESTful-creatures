const dinoRouter = require('express').Router();
const fs = require('fs'); //fs for file system

dinoRouter.get('/', (req, res) => {
    const dinoData = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(dinoData);
    res.render('dinosaurs/index', { dinos });

})

dinoRouter.get('/:id', (req, res) => {
    const dinoData = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(dinoData);
    const index = parseInt(req.params.id);
    const dino = dinos[index];
    res.render('dinosaurs/show', { dino });

})

module.exports = dinoRouter;