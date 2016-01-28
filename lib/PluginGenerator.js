//imports
import path from "path";
import * as fs from "justo-fs";

/**
 * Justo.json utilities.
 */
export default class PluginGenerator {
  /**
   * Generates a plugin scaffold.
   *
   * @param dir:string The dir path.
   */
  static generate(dir) {
    fs.copy(path.join(__dirname, "../template/plugin"), dir);
    new fs.Dir(dir, "lib").create();
    new fs.Dir(dir, "test/unit/data").create();
    fs.rename(dir + "/_package.json", "package.json");
  }
}
