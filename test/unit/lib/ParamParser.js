//imports
const ParamParser = require("../../../dist/es5/nodejs/justo-cli/lib/ParamParser").default;

//suite
describe("ParamParser", function() {
  describe("#parse()", function() {
    describe("name", function() {
      it("parse(name, opts) - {parse: false}", function() {
        ParamParser.parse("work", {parse: false}).must.be.eq(["work", []]);
      });

      it("parse(name, opts) - {parse: true}", function() {
        ParamParser.parse("work", {parse: true}).must.be.eq(["work", []]);
      });
    });

    describe("name:value", function() {
      it("parse(name:value, opts) - {parse: false}", function() {
        ParamParser.parse("work:1", {parse: false}).must.be.eq(["work", ["1"]]);
      });

      it("parse(name:value, opts) - {parse: true}", function() {
        ParamParser.parse("work:1", {parse: true}).must.be.eq(["work", [1]]);
      });
    });

    describe("name:value:value", function() {
      it("parse(name:value:value, opts) - {parse: false}", function() {
        ParamParser.parse("work:1:two:3", {parse: false}).must.be.eq(["work", ["1", "two", "3"]]);
      });

      it("parse(name:value:value, opts) -  {parse: true}", function() {
        ParamParser.parse("work:1:two:3", {parse: true}).must.be.eq(["work", [1, "two", 3]]);
      });
    });
  });
});
