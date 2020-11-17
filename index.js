const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
//body-parser
app.use(express.urlencoded({ extended: false }));
//method override to use PUT and DELETE
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/dinosaurs', require('./controllers/dinoController'));
app.use('/cryptids', require('./controllers/cryptidController'));



app.listen(8000, () => console.log('start'))