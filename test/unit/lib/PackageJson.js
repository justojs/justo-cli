//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const File = require("justo-fs").File;
const file = require("justo-assert-fs").file;
const PackageJson = require("../../../dist/es5/nodejs/justo-cli/lib/PackageJson");

//suite
describe("PackageJson", function() {
  const DATA_DIR = "test/unit/data";

  describe("#generate()", function() {
    const generate = PackageJson.generate;
    const DIR = new Dir(Dir.TMP_DIR, Date.now());

    beforeEach(function() {
      DIR.create();
    });

    afterEach(function() {
      DIR.remove();
    });

    it("generate(file)", function() {
      generate(path.join(DIR.path, "package.json"));
      file(DIR.path, "package.json").must.exist();
      file(DIR.path, "package.json").json.must.be.eq({});
    });
  });
});
