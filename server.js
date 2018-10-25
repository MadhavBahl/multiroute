const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8000;

var app = express();
app.use(bodyParser());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
var exec = require("child_process").exec;

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/tsp', (req, res) => {
    res.render('tsp.hbs');
});

app.post('/solution', (req, res) => { 
    finalinput = req.body.numNodes + '\r\n' + req.body.matrix;
    fs.writeFile('input.in', finalinput, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        exec("make < input.in", (err, stdout) => {
            if (err) {
                throw err;
            }
    
            console.log(stdout);
            stdout = stdout.split('\n');
            res.send({
                mincost: stdout[2],
                path: stdout[3]
            });
        });
    });
    
});

app.listen (port, () => {
    console.log(`Server is up on port ${port}`);
})