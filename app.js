var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var writeFile = require('./service/write.service.js');
var readFile = require('./service/file.service.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(200).send('Hello World!');
});

app.post('/add', function (req, res) {
    const data = req.body.start + ',' + req.body.end + ',' + req.body.value;
    try {
        writeFile.write('./data/input-file.txt', data)
        const dados = readFile.read('./data/input-file.txt');
        console.log("Route Data:\n", dados);
        res.status(200).send("Saved!");
    } catch (e) {
        res.status(500).send("Error!");
    }

});

app.post('/short', function (req, res) {
    try {
        const inicio = (req.body.start).toUpperCase().trim();
        const fim = (req.body.end).toUpperCase().trim();
        const dados = readFile.read('./data/input-file.txt');
        const bkpData = JSON.parse(JSON.stringify(dados)); // Preserva conteúdo
        const result = require('./utils/shortPath.js').find(bkpData, inicio, fim);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send("Error!");
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    try {
        const dados = readFile.read('./data/input-file.txt');
        console.log("Route Data:\n", dados);
    } catch (e) {
        console.log("No data loaded");
    }

});
