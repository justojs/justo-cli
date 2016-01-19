//imports
import os from "os";
import child_process from "child_process";
import JustoJson from "./JustoJson";

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
   * List the registered works into the Justo.json file.
   *
   * @param path:string The Justo.json file path.
   */
  static listRegisteredWorks(path) {
    const Loader = require("./Loader");
    const table = require("text-table");
    var works, tbl;

    //(1) read Justo.jsson and Justo.js
    JustoJson.read(path);
    works = Loader.loadJustoJs(JustoJson.runner.main);

    //(2) show works
    tbl = [];

    for (let name of Object.keys(works).sort()) {
      let work = works[name];
      tbl.push([
        work.name,
        work.isTesterWork() ? "test" : (work.isAutomatorWork() ? "autom" : "macro"),
        work.desc
      ]);
    }

    if (tbl.length > 0) tbl = [["Name", "Type", "Description"]].concat(tbl);
    console.log(table(tbl));
  }

  /**
   * Run works.
   *
   * @param justojson:string  The Justo.json file path.
   * @param calls:string[]    The works to run specified by the user.
   * @param opts:object       The CLI options specified by the user: parse (boolean), only (boolean).
   */
  static runWorks(justojson, calls, opts) {
    const Loader = require("./Loader");
    const Runner = require("./Runner");
    const Calls = require("./Calls");
    var works;

    //(1) arguments
    if (!calls || calls.length === 0) calls = ["default"];
    if (!opts) opts = {parse: false, only: false};

    //(2) read Justo.json and Justo.js
    justojson = JustoJson.read(justojson);
    works = Loader.loadJustoJs(justojson.runner.main, {only: opts.only});

    //(3) run
    Runner.run(Calls.parse(calls, opts), works);
  }
}
