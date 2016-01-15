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

    it("constructor(workOpts, testOpts) - {require: string, src: string}", function() {
      var work = new TesterWork({name: "test"}, {require: "justo-assert", src: "test/unit/lib/"});

      work.must.have({
        name: "test",
        desc: "",
        src: ["test/unit/lib/"],
        require: ["justo-assert"],
        timeout: undefined
      });

      work.isTesterWork().must.be.eq(true);
    });

    it("constructor(workOpts, testOpts) - {require: string[], src: string[]}", function() {
      var work = new TesterWork({name: "test"}, {require: ["justo-assert"], src: ["one.js", "two.js"]});

      work.must.have({
        name: "test",
        desc: "",
        src: ["one.js", "two.js"],
        require: ["justo-assert"],
        timeout: undefined
      });

      work.isTesterWork().must.be.eq(true);
    });
  });
});
