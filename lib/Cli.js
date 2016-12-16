//imports
import os from "os";
import path from "path";
import child_process from "child_process";
import * as fs from "justo-fs";
import JustoJson from "./JustoJson";
import ParamParser from "./ParamParser";

/**
 * The CLI API.
 */
export default class Cli {
  /**
   * Run a generator.
   *
   * @param justojson:string  The Justo.json file.
   * @param name:string       The generator name.
   * @param params:object[]   The generator parameters.
   * @param opts:object       The generator options: mute (boolean).
   */
  static generate(justojson, name, params, opts) {
    var cmd, answers, dst, help, pkg, pkgName, config;

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
    } else if (/^dst *$/.test(cmd)) {
      dst = true;
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

    //(3) get generator config if existing
    config = JustoJson.read(justojson).generator[pkgName];
    if (!config) config = {};
    if (!config.dst) config.dst = process.cwd();

    //(4) run or display help
    if (help) showHelp();
    else if (dst) showDst(config);
    else run(config);

    //helpers
    function showDst() {
      console.log(config.dst);
    }

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
          let tbl = [["  Name", "Type", "Description", "Options"]];

          for (let name of names.sort()) {
            let param, type, title, opts;

            param = help.params[name];

            if (typeof(param) == "string") {
              type = "String";
              title = param;
              opts = "";
            } else {
              type = param.type || "String";
              title = param.title || "";
              if ("choices" in param) opts = (param.choices ? param.choices.join(", ") : "");
              else if ("options" in param) opts = (param.options ? param.options.join(", ") : "");
              else opts = "";
            }

            tbl.push(["  " + name, type, title, opts]);
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

    function run(config) {
      var Class, gen;

      //(1) get generator class
      if (cmd) Class = pkg[cmd];
      else Class = (pkg instanceof Function ? pkg : pkg.default);

      //(2) create generator instance and set its src and dst folders if needed
      gen = new Class({mute: opts.mute}, answers);
      if (!gen.src) gen.src = path.join(path.dirname(require.resolve(pkgName)), "template");
      if (config.dst) gen.dst = config.dst;
      if (!gen.dst) gen.dst = process.cwd();

      //(3) run generator
      gen.run();
    }
  }

  /**
   * List the registered works into the Justo.json file.
   *
   * @param pth:string  The Justo.json file path.
   * @param opts:object The options.
   */
  static listCatalogedTasks(pth, opts) {
    const Loader = require(path.join(process.cwd(), "node_modules/justo-loader")).Loader;
    const table = require("text-table");
    var justo, config, tbl;

    //(1) read Justo.json and Justo.js
    config = JustoJson.read(pth, opts);
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
   * @param calls:string[]    The tasks to run specified by the user.
   * @param opts:object       The CLI options specified by the user: only (boolean).
   *
   * @return {state}
   */
  static runCatalogedTasks(justojson, calls, opts) {
    const Loader = require(path.join(process.cwd(), "node_modules/justo-loader")).Loader;
    const Calls = require("./Calls").default;
    var justo;

    //(1) arguments
    if (!calls || calls.length === 0) calls = ["default"];
    if (!opts) opts = {only: false};

    //(2) read Justo.json and Justo.js
    justojson = JustoJson.read(justojson, opts);
    if (opts.hasOwnProperty("only")) justojson.runner.only = opts.only;
    justo = Loader.loadJusto();
    justo.initialize(justojson);
    Loader.load(justojson.runner.main);

    //(3) run
    justo.runner.runCatalogedTasks(Calls.parse(calls, opts));

    //(4) return
    return {state: justo.runner.state};
  }

  // /**
  //  * Download the standalone project and run the cataloged tasks.
  //  *
  //  * @param src:string        The source URL.
  //  * @param calls:string[]    The tasks to run specified by the user.
  //  * @param opts:object       The CLI options specified by the user: only (boolean).
  //  */
  // static runDownloadableModule(src, calls, opts) {
  //   const download = require("justo-download");
  //   const sync = require("justo-sync");
  //   const unzip = require("justo-unzip");
  //   const url = require("url");
  //   const zip = path.basename(url.parse(src).path);
  //   var res;
  //
  //   //(1) download
  //   sync(function(done) {
  //     console.log(`  Downloading ${src}...`);
  //     download(src, process.cwd(), done);
  //   });
  //
  //   //(2) unzip
  //   sync(function(done) {
  //     console.log(`  Unzipping ${zip}...`);
  //     unzip(zip, process.cwd(), function(error) {
  //       if (error) return done(error);
  //
  //       console.log(`  Removing ${zip}...`);
  //       fs.remove(zip);
  //       done();
  //     });
  //   });
  //
  //
  //   //(3) run tasks
  //   var dir = basename(zip, ".zip");
  //   console.log(`  Changing to ${dir}...`);
  //   process.chdir(dir);
  //
  //   console.log("  Installing dependencies...");
  //   child_process.spawnSync("npm" + (os.platform().startsWith("win") ? ".cmd" : ""), ["install"]);
  //
  //   res = Cli.runCatalogedTasks("./Justo.json", calls, {only: opts.only});
  //   process.chdir("..");
  //
  //   //(4) return
  //   return res;
  // }

  /**
   * Run a module.
   *
   * @param name:string     The module name.
   * @param calls:string[]  The tasks to call.
   */
  static runInstalledModule(name, calls, opts) {
    const Calls = require("./Calls").default;
    var Loader, justo, justojson;

    //(1) cd module dir
    process.chdir(path.dirname(require.resolve(name)));

    //(2) arguments
    if (!calls || calls.length === 0) calls = ["default"];

    //(3) read Justo.json from mmodule
    Loader = require(path.join(process.cwd(), "node_modules/justo-loader")).Loader;
    justojson = JustoJson.read("Justo.json");
    justo = Loader.loadJusto();
    justo.initialize(justojson);

    //(4) load module
    require(name);

    //(5) run tasks
    justo.runner.runCatalogedTasks(Calls.parse(calls, {only: opts.only}));

    //(6) return
    return {state: justo.runner.state};
  }
}
