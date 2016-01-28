//imports
import path from "path";
import {copy} from "justo-fs";

/**
 * Justo.json utilities.
 */
export default class PackageJsonGenerator {
  /**
   * Generates the package.json file.
   *
   * @param file:string The file path.
   */
  static generate(file) {
    copy(path.join(__dirname, "../template/_package.json"), file);
  }
}
