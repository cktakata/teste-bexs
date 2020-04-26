var fileService = require("../../service/file.service");

describe("Testing the file service", () => {
    it("test read service", () => {
        const data = fileService.read("dummy.txt");
        expect(JSON.stringify(data)).toBe("[]")
    });
});
