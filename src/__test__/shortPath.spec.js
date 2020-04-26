var shortPath = require("../../utils/shortPath");

describe("Testing the shortPath", () => {
    it("test find method", () => {
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

        var inicio = 'GRU';
        var fim = 'CDG';
        const result = shortPath.find(dados, inicio, fim);
        expect(result).toBe("GRU-BRC-SLC-ORL-CDG, custo: 40")
    });
});
