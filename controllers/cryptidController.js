const cryptidRouter = require('express').Router();
const fs = require('fs'); //fs for file system

function readCryptids() {
    const cryptidData = fs.readFileSync('./cryptids.json');
    const cryptids = JSON.parse(cryptidData);
    return cryptids;
}

cryptidRouter.get('/', (req, res) => {
    let cryptids = readCryptids();

    let cryptidFilter = req.query.cryptidFilter;

    if (cryptidFilter && cryptidFilter !== 'all') {
        cryptids = cryptids.filter(function(cryptid) {
            return (cryptid.name.toLowerCase() === cryptidFilter.toLowerCase());
        });
    }
    res.render('cryptids/index', { cryptids });

})

cryptidRouter.get('/new', (req, res) => {
    res.render('cryptids/new');
})

cryptidRouter.get('/:id', (req, res) => {
    const cryptids = readCryptids()
    const index = parseInt(req.params.id);
    const cryptid = cryptids[index];
    res.render('cryptids/show', { cryptid });

})

cryptidRouter.post('/', (req, res) => {
    const cryptids = readCryptids()
    const newCryptid = req.body;
    cryptids.push(newCryptid);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    //make a new GET request
    res.redirect('/cryptids');
})



module.exports = cryptidRouter;