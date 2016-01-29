//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const Generator = require("../../../dist/es5/nodejs/justo-cli/lib/PluginGenerator").default;

//suite
describe("PluginGenerator", function() {
  const DATA_DIR = "test/unit/data";

  describe("#generate()", function() {
    const generate = Generator.generate;
    const DIR = new Dir(Dir.TMP_DIR, Date.now());

    beforeEach(function() {
      DIR.create();
    });

    afterEach(function() {
      DIR.remove();
    });

    it("generate(path)", function() {
      const dst = new Dir(DIR, "plugin");
      generate(dst.path);
      file(dst.path, "index.js").must.exist();
      file(dst.path, "package.json").must.exist();
      file(dst.path, "README.md").must.exist();
      file(dst.path, "Justo.js").must.exist();
      file(dst.path, "Justo.json").must.exist();
      file(dst.path, "lib/op.js").must.exist();
      dir(dst.path, "test").must.exist();
      dir(dst.path, "test/unit/data").must.exist();
      dir(dst.path, "test/unit/lib").must.exist();
      file(dst.path, "test/unit/index.js").must.exist();
    });
  });
});
