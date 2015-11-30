//imports
const TesterWork = require("../../../dist/es5/nodejs/justo-cli/lib/TesterWork");

//suite
describe("TesterWork", function() {
  describe("#constructor()", function() {
    it("constructor(workOpts, undefined)", function() {
      var work = new TesterWork({name: "test", desc: "Description."}, undefined);

      work.must.have({
        name: "test",
        desc: "Description.",
        src: [],
        require: [],
        timeout: undefined
      });
      work.isTesterWork().must.be.eq(true);
    });

    it("constructor(workOpts, testOpts) - {require: string}", function() {
      var work = new TesterWork({name: "test"}, {require: "justo-assert"});

      work.must.have({
        name: "test",
        desc: "",
        src: [],
        require: ["justo-assert"],
        timeout: undefined
      });

      work.isTesterWork().must.be.eq(true);
    });

    it("constructor(workOpts, testOpts) - {require: string[]}", function() {
      var work = new TesterWork({name: "test"}, {require: ["justo-assert"]});

      work.must.have({
        name: "test",
        desc: "",
        src: [],
        require: ["justo-assert"],
        timeout: undefined
      });

      work.isTesterWork().must.be.eq(true);
    });

    it("constructor(workOpts, testOpts) - {src, require, timeout}", function() {
      var work = new TesterWork({name: "test"}, {src: ["one.js"], require: "justo-assert", timeout: 1500});

      work.must.have({
        name: "test",
        desc: "",
        src: ["one.js"],
        require: ["justo-assert"],
        timeout: 1500
      });

      work.isTesterWork().must.be.eq(true);
    });
  });
});
