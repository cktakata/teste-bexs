var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/add', function (req, res) {
    const data = req.body.start + ',' + req.body.end + ',' + req.body.value;
    var writeFile = require('./service/write.service.js');
    writeFile.write('./data/input-file.txt', data)
    var readFile = require('./service/file.service.js');
    const dados = readFile.read('./data/input-file.txt');
    console.log("Route Data:\n", dados);
    res.send("Saved!");
});

app.post('/short', function (req, res) {
    const inicio = (req.body.start).toUpperCase().trim();
    const fim = (req.body.end).toUpperCase().trim();
    var readFile = require('./service/file.service.js');
    const dados = readFile.read('./data/input-file.txt');
    const bkpData = JSON.parse(JSON.stringify(dados)); // Preserva conteúdo
    const result = require('./utils/shortPath.js').find(bkpData, inicio, fim);
    res.send(result);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    var readFile = require('./service/file.service.js');
    const dados = readFile.read('./data/input-file.txt');
    console.log("Route Data:\n", dados);
});
