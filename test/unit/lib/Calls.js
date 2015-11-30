//imports
const Calls = require("../../../dist/es5/nodejs/justo-cli/lib/Calls");

//suite
describe("Calls", function() {
  describe("#parse()", function() {
    it("parse(calls, opts) - {parse: false}", function() {
      var calls = Calls.parse(["work0", "work1:1", "work2:1:2", "work3:1:two:3"], {parse: false});

      calls.must.be.instanceOf(Calls);
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

    it("parse(calls, opts) - {parse: true}", function() {
      var calls = Calls.parse(["work0", "work1:1", "work2:1:2", "work3:1:two:3"], {parse: true});

      calls.must.be.instanceOf(Calls);
      calls.length.must.be.eq(4);

      calls[0].must.be.instanceOf("Call");
      calls[0].must.have({
        name: "work0",
        params: []
      });

      calls[1].must.be.instanceOf("Call");
      calls[1].must.have({
        name: "work1",
        params: [1]
      });

      calls[2].must.be.instanceOf("Call");
      calls[2].must.have({
        name: "work2",
        params: [1, 2]
      });

      calls[3].must.be.instanceOf("Call");
      calls[3].must.have({
        name: "work3",
        params: [1, "two", 3]
      });
    });
  });
});