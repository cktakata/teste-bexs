module.exports.find = function (dados, inicio, fim, custoPath) {
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

    var custoPath = [];
    for (var i = 0; i < dados.length; i++) {
        if (dados[i].start === inicio) {
            custoPath.push(dados[i]);
            var final = dados[i].end;
            // dados.splice(i, 1);
            // var copiaDados = dados;
            calculaProxima(dados, final, fim, custoPath)
            // console.log(copiaDados)
            // console.log("Final", custoPath);
            return custoPath;
        }
    }

    // return calculaProxima(dados, inicio, fim, custoPath);

    function calculaProxima(dados, inicio, fim, custoPath) {
        var flag = true;
        var i = 0;
        while (flag || dados !== undefined) {
            // console.log("Procurando: ", inicio)
            // if (inicio === 'SLC') {
            //     console.log(dados[i])
            // }
            try {
                if (dados[i].start === inicio) {
                    // console.log("Found at ", i)
                    custoPath.push(dados[i]);
                    var final = dados[i].end;
                    // console.log(dados[i].start + " - " + dados[i].end)
                    if (dados[i].end === fim) {
                        // console.log("Achei o fim")
                        flag = false;
                        // console.log(custoPath)
                        return custoPath
                    } else {
                        dados.splice(i, 1);
                        // console.log("DEBUG: ", dados)
                        // i = 0;
                        if (dados.length > 0) {
                            calculaProxima(dados, final, fim, custoPath)
                        } else {
                            flag = false;
                            return custoPath
                        }
                    }
                }
                i++;
            } catch (e) {
                return
            }

        }

    }

}