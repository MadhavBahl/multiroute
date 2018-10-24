const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const port = process.env.PORT || 8000;

var app = express();
app.use(bodyParser());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/tsp', (req, res) => {
    res.send('<h1>Let\'s solve TSP');
});

app.listen (port, () => {
    console.log(`Server is up on port ${port}`);
})