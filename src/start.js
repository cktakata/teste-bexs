var shortPath = require('../utils/shortPath.js');

var myArgs = process.argv.slice(2);

var readFile = require('../service/file.service.js');
const dados = readFile.read(myArgs);
console.log("Route Data:\n", dados);

var standard_input = process.stdin;
// Set input character encoding.
standard_input.setEncoding('utf-8');

// Prompt user to input data in console.
console.log("Please enter the route");

// When user input data and click enter key.
standard_input.on('data', function (data) {
    // User input exit.
    if (data === 'exit\n') {
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    } else {
        // Print user input in console.
        const inicio = (data.split('-')[0]).toUpperCase().trim();
        const fim = (data.split('-')[1]).toUpperCase().trim();
        const bkpData = JSON.parse(JSON.stringify(dados)); // Preserva conteúdo
        const result = shortPath.find(bkpData, inicio, fim);
        console.log(result);
        console.log("Please enter the route");
    }
});
