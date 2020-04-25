
var fs = require('fs');

module.exports.read = function (arquivo) {

    var dados = [];

    function parseFile(arquivo) {
        const line = fs.readFileSync(__dirname + '/../' + arquivo, 'utf8');
        var lines = line.split('\n');
        for (var i = 0; i < lines.length; i++) {
            const linha = lines[i].split(',');
            const obj = '{"' + linha[0] + '-' + linha[1] + '":' + linha[2] + '}';
            dados.push(JSON.parse(obj));
        }
        return dados
    }
    return parseFile(arquivo);

}
