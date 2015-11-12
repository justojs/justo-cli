//imports
import {File} from "justo-fs";

/**
 * Returns the configuration stored into the justo.json file.
 */
export default class JustoJsonParser {
  /**
   * Reads the justo.json file.
   *
   * @param fp:string   The file path.
   * @return object
   */
  static parse(fp) {
    var file;

    //(1) does file exist?
    file = new File(fp);
    if (!file.exists()) throw new Error(`The '${fp}' file doesn't exist or this can't be accessed.`);

    //(2) return configuration
    return file.json;
  }
}
