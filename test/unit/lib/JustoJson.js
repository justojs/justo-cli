//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const File = require("justo-fs").File;
const file = require("justo-assert-fs").file;
const JustoJson = require("../../../dist/es5/nodejs/justo-cli/lib/JustoJson").default;

//suite
describe("JustoJson", function() {
  const DATA_DIR = "test/unit/data";

  describe("#read()", function() {
    const read = JustoJson.read;

    it("read(file) - onError not indicated", function() {
      read(path.join(DATA_DIR, "Justo.json")).must.have({
        runner: {
          main: "Justo.js",
          onError: "continue"
        }
      });
    });

    it("read(file) - onError indicated", function() {
      read(path.join(DATA_DIR, "Justo.full.json")).must.have({
        runner: {
          main: "Justo.full.js",
          onError: "break"
        }
      });
    });

    it("read(file) - unknown file", function() {
      read(path.join(DATA_DIR, "unknown.Justo.js")).must.have({
        runner: {
          main: "Justo.js",
          onError: "continue"
        }
      });
    });
  });
});
