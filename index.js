const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
//body-parser
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/dinosaurs', require('./controllers/dinoController'));



app.listen(8000, () => console.log('start'))