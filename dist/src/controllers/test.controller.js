"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = void 0;
const test_service_1 = require("./../services/test.service");
class TestController {
    async createTest(req, res) {
        try {
            const testId = await test_service_1.testService.createTest({
                creator: 'testCreator',
                name: 'Me',
                surname: 'Creator',
                numberOfQuestions: 10,
                technologies: ['hands', 'arms'],
                formTitle: 'Technical Quiz',
                formDescription: 'Pass this test to show your technical knowledge',
                formLink: 'https://forms.gle/2fDwGMnj3868uhVD8'
            });
            return res.status(200).send({ status: "Success", message: "Test Saved", testId });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ status: "Failed", message: error });
        }
    }
    async getTest(req, res) {
        try {
            const testData = await test_service_1.testService.getTest(req.body.testId);
            return res.status(200).send({
                status: "Success", data: testData
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ status: "Failed", message: error });
        }
    }
    async getResults(req, res) {
        try {
            const results = await test_service_1.testService.getResults();
            return res.status(200).send({ status: "Success", data: results });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ status: "Failed", message: error });
        }
    }
}
exports.testController = new TestController();
//# sourceMappingURL=test.controller.js.map