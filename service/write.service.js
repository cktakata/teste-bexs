
var fs = require('fs');

module.exports.write = function (arquivo, data) {

    function parseFile(arquivo) {
        try {
            const line = fs.readFileSync(__dirname + '/../' + arquivo, 'utf8');
            fs.writeFileSync(__dirname + '/../' + arquivo, line + '\n' + data);
            return true
        } catch (e) {
            return false
        }
    }
    return parseFile(arquivo);

}
