//imports
import path from "path";
import {File} from "justo-fs";

/**
 * Justo.json utilities.
 */
export default class JustoJs {
  /**
   * Generates the Justo.js file.
   *
   * @param file:string The file path.
   */
  static generate(file) {
    file = new File(file);
    file.text = "//imports\nconst justo = require(\"justo\");\nconst catalog = justo.catalog;\n\n" +
                "//tasks\ncatalog.macro({name: \"default\", desc: \"Default task.\"}, []);";
  }
}
