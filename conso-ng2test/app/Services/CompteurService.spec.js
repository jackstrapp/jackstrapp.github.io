"use strict";
const common_1 = require("@angular/common");
describe('CompteurService', function () {
    let pipe = new common_1.JsonPipe();
    it('transforms {"abc": 2} to "{\"abc\": 2}"', () => {
        expect(pipe.transform({ "abc": 2 })).toBe("{\"abc\": 2}");
    });
    it('true is true', () => expect(true).toBe(true));
});
//# sourceMappingURL=CompteurService.spec.js.map