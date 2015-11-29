//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const File = require("justo-fs").File;
const file = require("justo-assert-fs").file;
const JustoJson = require("../../../dist/es5/nodejs/justo-cli/lib/JustoJson");

//suite
describe("JustoJson", function() {
  const DATA_DIR = "test/unit/data";

  describe("#read()", function() {
    const read = JustoJson.read;

    it("read(file)", function() {
      read(path.join(DATA_DIR, "Justo.json")).must.have({
        runner: {
          main: "Justo.js"
        }
      });
    });

    it.skip("read(file) - unknown", function() {
      read.must.raise(/file doesn't exist/, [path.join(DATA_DIR, "Justo.js.unknown")]);
    });
  });

  describe("#generate()", function() {
    const generate = JustoJson.generate;
    const DIR = new Dir(Dir.TMP_DIR, Date.now());

    beforeEach(function() {
      DIR.create();
    });

    afterEach(function() {
      DIR.remove();
    });

    it("generate(file)", function() {
      generate(path.join(DIR.path, "Justo.json"));
      file(DIR.path, "Justo.json").must.exist();
      file(DIR.path, "Justo.json").json.must.be.eq({
        runner: {
          main: "Justo.js"
        }
      });
    });
  });
});
