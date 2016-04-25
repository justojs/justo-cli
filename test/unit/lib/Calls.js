//imports
const Calls = require("../../../dist/es5/nodejs/justo-cli/lib/Calls").default;

//suite
describe("Calls", function() {
  describe("#parse()", function() {
    it("parse(calls, opts) - {}", function() {
      var calls = Calls.parse(["work0", "work1:1", "work2:1:2", "work3:1:two:3"], {});

      calls.must.be.instanceOf(Array);
      calls.length.must.be.eq(4);

      calls[0].must.be.instanceOf("Call");
      calls[0].must.have({
        name: "work0",
        params: []
      });

      calls[1].must.be.instanceOf("Call");
      calls[1].must.have({
        name: "work1",
        params: ["1"]
      });

      calls[2].must.be.instanceOf("Call");
      calls[2].must.have({
        name: "work2",
        params: ["1", "2"]
      });

      calls[3].must.be.instanceOf("Call");
      calls[3].must.have({
        name: "work3",
        params: ["1", "two", "3"]
      });
    });
  });
});
