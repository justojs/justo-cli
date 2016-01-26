//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const File = require("justo-fs").File;
const file = require("justo-assert-fs").file;
const JustoJs = require("../../../dist/es5/nodejs/justo-cli/lib/JustoJs");

//suite
describe("JustoJs", function() {
  const DATA_DIR = "test/unit/data";

  describe("#generate()", function() {
    const generate = JustoJs.generate;
    const DIR = new Dir(Dir.TMP_DIR, Date.now());

    beforeEach(function() {
      DIR.create();
    });

    afterEach(function() {
      DIR.remove();
    });

    it("generate(file)", function() {
      generate(path.join(DIR.path, "Justo.js"));
      file(DIR.path, "Justo.js").must.exist();
      file(DIR.path, "Justo.js").text.must.be.eq(
        "//imports\n" +
        "const register = require(\"justo\").register;\n" +
        "\n" +
        "//tasks\n" +
        "register({name: \"default\", desc: \"Default task.\"}, []);");
    });
  });
});
