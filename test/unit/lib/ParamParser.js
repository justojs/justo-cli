//imports
const ParamParser = require("../../../dist/es5/nodejs/justo-cli/lib/ParamParser").default;

//suite
describe("ParamParser", function() {
  describe("#parse()", function() {
    describe("name", function() {
      it("parse(name, opts) - {}", function() {
        ParamParser.parse("work", {}).must.be.eq(["work", []]);
      });
    });

    describe("name:value", function() {
      it("parse(name:value, opts) - {}", function() {
        ParamParser.parse("work:1", {}).must.be.eq(["work", ["1"]]);
      });
    });

    describe("name:value:value", function() {
      it("parse(name:value:value, opts) - {}", function() {
        ParamParser.parse("work:1:two:3", {}).must.be.eq(["work", ["1", "two", "3"]]);
      });
    });
  });
});
