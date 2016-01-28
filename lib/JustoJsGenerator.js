//imports
import path from "path";
import {copy} from "justo-fs";

/**
 * Justo.json utilities.
 */
export default class JustoJsGenerator {
  /**
   * Generates the Justo.js file.
   *
   * @param file:string The file path.
   */
  static generate(file) {
    copy(path.join(__dirname, "../template/Justo.js"), file);
  }
}
