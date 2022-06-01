"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testService = void 0;
const app_1 = require("./../app");
class TestService {
    async createTest({ creator, name, surname, numberOfQuestions, technologies, formTitle, formDescription, formLink }) {
        return await app_1.db.collection("tests").doc().create({
            creator,
            name,
            surname,
            numberOfQuestions,
            technologies,
            formTitle,
            formDescription,
            formLink
        });
    }
    async getTest(testId) {
        const reqDoc = app_1.db.collection("tests").doc(testId);
        const test = await reqDoc.get();
        const response = test.data();
        //get form from api
        const form = `<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfbuA5jZ2DR2K4tpSI4xiSUTL6sEBeTF3328dyC4R-U__VWBQ/viewform?embedded=true" width="1000" height="800" frameborder="0" marginheight="0" marginwidth="0">Загрузка…</iframe>`;
        return {
            test: response,
            form
        };
    }
    async getResults() {
        const query = app_1.db.collection("results");
        const results = [];
        await query.get().then((data) => {
            const docs = data.docs;
            docs.map((doc) => {
                results.push(doc.data());
            });
            return results;
        });
        return results;
    }
}
exports.testService = new TestService();
//# sourceMappingURL=test.service.js.map