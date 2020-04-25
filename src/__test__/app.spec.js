const supertest = require('supertest');
const app = require('../../app');

describe("Testing the API", () => {

    it("tests the base route and returns true for status", async (done) => {

        const response = await supertest(app).get('/').end(done);
        mock('../../service/file.service.js', {
            read: function () {
                console.log('http.request called');
            }
        });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);

    });

    it("tests the post add endpoint and returns as success message", async () => {

        const response = await supertest(app).post('/add').send("Saved!");

        expect(response.status).toBe(200);

    });

    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });

});
