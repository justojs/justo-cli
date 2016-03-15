//imports
import os from "os";
import path from "path";
import child_process from "child_process";
import JustoJson from "./JustoJson";
import ParamParser from "./ParamParser";

/**
 * The CLI API.
 */
export default class Cli {
  /**
   * Run a generator.
   *
   * @param name:string     The generator name.
   * @param params:object[] The generator parameters.
   * @param opts:object     The generator options: parse (boolean), mute (boolean).
   */
  static generate(name, params, opts) {
    var cmd, answers, help, pkg, pkgName;

    //(1) get command and answers
    answers = {};

    for (let p of params) {
      if (/^.+:.*$/.test(p)) {
        let [name, value] = ParamParser.parse(p, opts);
        answers[name] = (value.length == 1 ? value[0] : value);
      } else {
        if (cmd) cmd += " " + p;
        else cmd = p;
      }
    }

    if (/^help ?/.test(cmd)) {
      help = true;
      cmd = cmd.replace(/^help ?/, "");
    }

    //(2) load generator package
    try {
      pkgName =`justo-generator-${name}`;
      pkg = require(pkgName);
    } catch(e) {
      if (/^Cannot find module/.test(e.message)) {
        throw new Error(`The generator is not installed. Please, install it using 'npm install -g ${pkgName}'.`);
      } else {
        throw e;
      }
    }

    //(3) run or display help
    if (help) showHelp();
    else run();

    //helpers
    function showHelp() {
      if (cmd) showGeneratorHelp(pkg[cmd]);
      else if (pkg instanceof Function) showGeneratorHelp(pkg);
      else showPackageHelp(pkg);
    }

    function showGeneratorHelp(Class) {
      const table = require("text-table");
      var gen, help;

      //(1) create generator instance
      gen = new Class({}, {});
      help = gen.help;

      //(2) display description
      if (help.desc) {
        console.log("Description:");
        console.log(" ", help.desc);
      }

      //(2) display parameters
      if (help.params) {
        let names = Object.keys(help.params);

        if (names.length > 0) {
          let tbl = [["  Name", "Type", "Description", "Choices"]];

          for (let name of names.sort()) {
            let param, type, title, choices;

            param = help.params[name];

            if (typeof(param) == "string") {
              type = "String";
              title = param;
              choices = "";
            } else {
              type = param.type || "String";
              title = param.title || "";
              choices = (param.choices ? param.choices.join(", ") : "");
            }

            tbl.push(["  " + name, type, title, choices]);
          }

          console.log("\nParameters:");
          console.log(table(tbl));
        }
      }
    }

    function showPackageHelp(pkg) {
      const table = require("text-table");

      //(1) show default generator help
      if (pkg.default) showGeneratorHelp(pkg.default);

      //(2) show command and description of the rest of generators
      let names = Object.keys(pkg);

      if (names.length > 1) { //default and others
        let tbl = [["  Name", "Description"]];

        for (let name of names.sort()) {
          if (name != "default") {
            let gen = new pkg[name]({}, {});
            tbl.push(["  " + name, gen.help.desc || ""]);
          }
        }

        console.log("\nCommands (use 'help command' for more info):");
        console.log(table(tbl));
      }
    }

    function run() {
      var Class, gen;

      //(1) get generator class
      if (cmd) Class = pkg[cmd];
      else Class = (pkg instanceof Function ? pkg : pkg.default);

      //(2) create generator instance and set its source folder if needed
      gen = new Class({mute: opts.mute}, answers);
      if (!gen.src) gen.src = path.join(path.dirname(require.resolve(pkgName)), "template");

      //(3) run generator
      gen.run();
    }
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
