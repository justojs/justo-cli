//imports
const Call = require("../../../dist/es5/nodejs/justo-cli/lib/Call").default;

//suite
describe("Call", function() {
  describe("#construtor()", function() {
    it("constructor(name, params)", function() {
      var call = new Call("test", [1, 2, 3]);
      call.must.have({
        name: "test",
        params: [1, 2, 3]
      });
    });
  });

  describe("#parse()", function() {
    describe("work", function() {
      it("parse(call, opts) - {}", function() {
        var call = Call.parse("work", {});

        call.must.be.instanceOf(Call);
        call.must.have({
          name: "work",
          params: []
        });
      });
    });

    describe("work:param", function() {
      it("parse(call, opts) - {}", function() {
        var call = Call.parse("work:1", {});

        call.must.be.instanceOf(Call);
        call.must.have({
          name: "work",
          params: ["1"]
        });
      });
    });

    describe("work:param:param", function() {
      it("parse(call, opts) - {}", function() {
        var call = Call.parse("work:1:two:3", {parse: false});

        call.must.be.instanceOf(Call);
        call.must.have({
          name: "work",
          params: ["1", "two", "3"]
        });
      });
    });
  });
});
