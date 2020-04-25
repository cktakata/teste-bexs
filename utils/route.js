module.exports.log = function () {

    console.log("Hello world!");

    var dados =
        [
            { 'start': 'GRU', 'end': 'BRC', 'price': 10 },
            { 'start': 'BRC', 'end': 'SLC', 'price': 5 },
            { 'start': 'GRU', 'end': 'CDG', 'price': 75 },
            { 'start': 'GRU', 'end': 'SLC', 'price': 20 },
            { 'start': 'GRU', 'end': 'ORL', 'price': 56 },
            { 'start': 'ORL', 'end': 'CDG', 'price': 5 },
            { 'start': 'SLC', 'end': 'ORL', 'price': 20 },
        ];

    var inicio = 'GRU';
    var fim = 'CDG';
    var arrayPath = [];

    // arrayPath.push(require('./calculaRota.js').find(dados, inicio, fim, arrayPath));
    // console.log(arrayPath)
    for (var i = 0; i < dados.length; i++) {
        if (dados[i].start === inicio) {
            // arrayPath.push(dados[i]);
            arrayPath.push(require('./calculaRota.js').find(dados, inicio, fim, arrayPath));
            console.log(i, arrayPath)
            // arrayPath = [];
        }
    }
    console.log("Fim do programa")

};