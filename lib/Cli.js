//imports
import os from "os";
import child_process from "child_process";
import JustoJson from "./JustoJson";
import JustoJs from "./JustoJs";
import PackageJson from "./PackageJson";

/**
 * The CLI API.
 */
export default class Cli {
  /**
   * Install Justo.
   */
  static installJusto() {
    var res, cmd;

    //(1) determine command
    if (/^win/.test(os.platform())) cmd = "npm.cmd";
    else cmd = "npm";

    //(1) run
    console.log("Installing packages...");
    res = child_process.spawnSync(cmd, ["install", "--save-dev", "justo"]);

    //(2) show output
    if (res.stdout) console.log(res.stdout.toString());
    if (res.error) {
      console.log(res.stderr.toString());
      console.log(res.error.toString());
    }
  }

  /**
   * Generate the Justo.json file.
   *
   * @param path:string The file path.
   */
  static generateJustoJson(path) {
    JustoJson.generate(path);
  }

  /**
   * Generate the Justo.json file.
   *
   * @param path:string The file path.
   */
  static generateJustoJs(path) {
    JustoJs.generate(path);
  }

  /**
   * Generate the package.json file.
   *
   * @param path:string The file path.
   */
  static generatePackageJson(path) {
    PackageJson.generate(path);
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
    const Calls = require("./Calls");
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
