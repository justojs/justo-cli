//imports
import os from "os";
import path from "path";
import child_process from "child_process";
import JustoJson from "./JustoJson";

/**
 * The CLI API.
 */
export default class Cli {
  /**
   * Run a generator.
   *
   * @param name:string         The generator name.
   * @param responses:object[]  The default answers.
   */
  static generate(name, responses) {
    const pkg = "justo-generator-" + name;
    var gen;

    //(1) read generator
    try {
      let Class = require(pkg);
      gen = new Class({}, responses);
    } catch (e) {
      if (/^Cannot find module/.test(e.message)) {
        throw new Error(`The generator is not installed. Please, install it using 'npm install -g ${pkg}'.`);
      } else {
        throw e;
      }
    }

    if (!gen.src) gen.src = path.join(path.dirname(require.resolve(pkg)), "template");

    //(2) run generator
    gen.run();
  }

  /**
   * List the registered works into the Justo.json file.
   *
   * @param path:string The Justo.json file path.
   */
  static listCatalogedTasks(path) {
    const Loader = require("justo-loader").Loader;
    const table = require("text-table");
    var justo, config, tbl;

    //(1) read Justo.json and Justo.js
    config = JustoJson.read(path);
    justo = Loader.loadJusto();
    justo.initialize(config);
    Loader.load(config.runner.main);

    //(2) show works
    tbl = [];
    for (let name of Object.keys(justo.runner.catalog.tasks).sort()) {
      let task = justo.runner.catalog.get(name).__task__;

      tbl.push([
        task.name,
        task.desc || ""
      ]);
    }

    if (tbl.length > 0) tbl = [["Name", "Description"]].concat(tbl);
    console.log(table(tbl));
  }

  /**
   * Run works.
   *
   * @param justojson:string  The Justo.json file path.
   * @param calls:string[]    The works to run specified by the user.
   * @param opts:object       The CLI options specified by the user: parse (boolean), only (boolean).
   */
  static runCatalogedTasks(justojson, calls, opts) {
    const Loader = require("justo-loader").Loader;
    const Calls = require("./Calls").default;
    var justo;

    //(1) arguments
    if (!calls || calls.length === 0) calls = ["default"];
    if (!opts) opts = {parse: false, only: false};

    //(2) read Justo.json and Justo.js
    justojson = JustoJson.read(justojson);
    if (opts.hasOwnProperty("only")) justojson.runner.only = opts.only;
    justo = Loader.loadJusto();
    justo.initialize(justojson);
    Loader.load(justojson.runner.main);

    //(3) run
    justo.runner.runCatalogedTasks(Calls.parse(calls, opts));
  }
}
