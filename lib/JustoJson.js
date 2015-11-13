//imports
import {File} from "justo-fs";

/**
 * Justo.json utilities.
 */
export default class JustoJson {
  /**
   * Reads the Justo.json file.
   *
   * @param file:string The file path.
   * @return object
   */
  static parse(file) {
    //(1) does file exist?
    file = new File(file);
    if (!file.exists()) throw new Error(`The '${file.path}' file doesn't exist or this can't be accessed.`);

    //(2) return configuration
    return file.json;
  }

  /**
   * Generates the Justo.json file.
   *
   * @param file:string The file path.
   */
  static generate(file) {
    file = new File(file);
    file.create();
    file.json = {
      automator: {
        name: "app",
        main: "Justo.js"
      }
    };
  }
}
