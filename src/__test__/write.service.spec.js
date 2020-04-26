var writeService = require("../../service/write.service");

describe("Testing the write service", () => {
    it("test write service", () => {
        const data = writeService.write("dummy.txt");
        expect(data).toBe(false)
    });
});
