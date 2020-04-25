
var fs = require('fs');

module.exports.write = function (arquivo, data) {

    function parseFile(arquivo) {
        const line = fs.readFileSync(__dirname + '/../' + arquivo, 'utf8');
        fs.writeFileSync(__dirname + '/../' + arquivo, line + '\n' + data);
        return true
    }
    return parseFile(arquivo);

}
