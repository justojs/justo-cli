//imports
import path from "path";
import {copy, File} from "justo-fs";

//internal data
var config;

/**
 * Justo.json utilities.
 */
export default class JustoJson {
  /**
   * Reads the Justo.json file.
   *
   * @param file:string The file path.
   */
  static read(file) {
    //(1) read
    file = new File(file);
    config = file.exists() ? file.json : {};

    //(2) set mandatory options if needed
    if (!config.runner) config.runner = {main: "./Justo.js"};
    if (!config.runner.main) config.runner.main = "./Justo.js";
    if (!config.runner.main.startsWith(".")) config.runner.main = path.join(".", config.runner.main);
    config.runner.main = path.normalize(config.runner.main);
    if (!config.runner.onError) config.runner.onError = "continue";

    if (!config.automator) config.automator = {};
    if (!config.tester) config.tester = {};

    //(3) return
    return config;
  }

  static get config() {
    return config;
  }

  /**
   * The runner option.
   *
   * @type object
   */
  static get runner() {
    return config.runner;
  }

  /**
   * The automator option.
   *
   * @type object
   */
  static get automator() {
    return config.automator;
  }

  /**
   * The tester option.
   *
   * @type object
   */
  static get tester() {
    return config.tester;
  }
}
