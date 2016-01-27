//imports
import path from "path";
import {File} from "justo-fs";

/**
 * Justo.json utilities.
 */
export default class PackageJson {
  /**
   * Generates the Justo.js file.
   *
   * @param file:string The file path.
   */
  static generate(file) {
    file = new File(file);
    file.json = {};
  }
}
