module.exports.find = function () {
    var dados =
        [
            { 'GRU-BRC': 10 },
            { 'BRC-SLC': 5 },
            { 'GRU-CDG': 75 },
            { 'GRU-SLC': 20 },
            { 'GRU-ORL': 56 },
            { 'ORL-CDG': 5 },
            { 'SLC-ORL': 20 }
        ];

    const data = JSON.parse(JSON.stringify(dados)); // Preserva conteúdo
    var inicio = 'SLC';
    var fim = 'CDG';

    validateRoute(dados, inicio, fim);
    // Começa o programa em si
    const allPaths = run(dados, inicio, fim);
    // Calcula a rota mais barata
    var minorCost = 999999;
    var winnerPath = '';
    for (var rota of allPaths) {
        var sum = 0;
        for (var i = 0; i < rota.length; i++) {
            data.filter((v) => {
                if (Object.keys(v)[0] == new Array(rota[i])[0]) {
                    sum += parseInt(Object.values(v));
                }
            })
        }
        if (sum <= minorCost) {
            minorCost = sum;
            for (var i = 0; i < rota.length; i++) {
                if (i == 0) {
                    winnerPath = rota[i];
                } else {
                    winnerPath = winnerPath + '-' + rota[i].split('-')[1];
                }
            }
        }
    }
    console.log(winnerPath + ", custo: " + minorCost)

    function run(dados, inicio, fim) {
        let allPaths;
        let added = true;
        while (added) {
            if (!allPaths) {
                allPaths = [];
                const data = JSON.parse(JSON.stringify(dados)); // Preserva conteúdo
                const mainPath = main(dados, inicio, fim);
                if (mainPath) {
                    allPaths.push(mainPath);
                    dados = data;
                    dados = removeItem(dados, mainPath);
                } else {
                    added = false;
                }
            } else {
                const data = JSON.parse(JSON.stringify(dados)); // Preserva conteúdo
                const mainPath = main(dados, inicio, fim);
                if (mainPath.length > 0) {
                    allPaths.push(mainPath);
                    dados = data;
                    dados = removeItem(dados, allPaths[allPaths.length - 1]);
                } else {
                    added = false;
                }
            }
        }
        return allPaths;
    }

    function removeItem(dados, item) {
        const newData = dados.filter(function (v) {
            if (Object.keys(v)[0] != new Array(item[0])[0]) {
                return v
            }
        })
        return newData;
    }

    function main(dados, inicio, fim) {
        var final = false; // Ainda não temos o final
        var arrayPath = [];

        while (!final) {
            const rota = calculaProximaRota(dados, inicio);
            if (rota) {
                arrayPath.push(rota);
                if (rota.split('-')[1] === fim) {
                    final = true;
                }
                inicio = rota.split('-')[1];
                dados.splice(rota, 1);
            } else {
                final = true
            }
        }
        return arrayPath
    }

    function calculaProximaRota(dados, inicio) {
        for (var obj of Object.values(dados)) {
            for (var rota of Object.keys(obj)) {
                if (rota.split('-')[0] === inicio) {
                    return rota
                }
            }
        }
        return null;
    }

    function validateRoute(dados, inicio, fim) {
        // Verifica se tem pelo menos 1 rota com o início desejado
        var blindagem = 0;
        for (var obj of Object.values(dados)) {
            for (var rota of Object.keys(obj)) {
                if (rota.split('-')[0] === inicio && blindagem % 2 === 0) {
                    blindagem = blindagem + 1; // Transforma em par
                }
                if (rota.split('-')[1] === fim && blindagem <= 10) {
                    blindagem = blindagem + 10;
                }
            }
        }
        switch (blindagem) {
            case 0:
                console.log("Não existe rota informada");
                return false;
            case 1:
                console.log("Não existe rota final informada");
                return false;
            case 10:
                console.log("Não existe rota inicial informada");
                return false;
        }
        console.log("Existe rota informada, calculando...");
        return true;
    }

}