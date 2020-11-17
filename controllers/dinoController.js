const dinoRouter = require('express').Router();
const fs = require('fs'); //fs for file system

function readDinos() {
    const dinoData = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(dinoData);
    return dinos;
}

dinoRouter.get('/', (req, res) => {
    const dinoData = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(dinoData);
    res.render('dinosaurs/index', { dinos });

})

dinoRouter.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

dinoRouter.get('/:id', (req, res) => {
    const dinos = readDinos()
    const index = parseInt(req.params.id);
    const dino = dinos[index];
    res.render('dinosaurs/show', { dino });

})

dinoRouter.post('/', (req, res) => {
    const dinos = readDinos()
    const newDino = req.body;
    dinos.push(newDino);
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    //make a new GET request
    res.redirect('/dinosaurs');
})



module.exports = dinoRouter;