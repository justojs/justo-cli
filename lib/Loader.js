//imports
import path from "path";
import Cli from "./Cli";
import Works from "./Works";
import AutomatorWork from "./AutomatorWork";
import TesterWork from "./TesterWork";

//internal members
const JUSTO = path.join(process.cwd(), "node_modules", "justo");
var works;

/**
 * A loader of Justo.json files.
 */
export default class Loader {
  /**
   * Load the Justo.js file.
   *
   * @param file:string The Justo.js file path.
   */
  static loadJustoJs(file) {
    var justo, autom;

    //(1) initialize justo
    justo = Loader.importJusto();
    justo.initialize();

    //(2) load Justo.js
    justo.publish(register);

    works = new Works();
    require(path.join(process.cwd(), file));

    justo.unpublish(register);

    //(3) return registered works
    return works;
  }

  /**
   * Import the justo package.
   */
  static importJusto() {
    return require(JUSTO);
  }
}

/**
 * Register a work.
 *
 * @overload Tester work.
 * @param name:string The work name.
 * @param opts:object The test options.
 *
 * @overload Tester work.
 * @param workOpts:object The work options.
 * @param testOpts:object The test options.
 *
 * @overload Automator work.
 * @param name:string The work name.
 * @param fn:function The function: task wrapper function or definition function.
 *
 * @overload Automator work.
 * @param opts:object The work options.
 * @param fn:function The function.
 *
 * @overload Automator work.
 * @param name:strings    The work name.
 * @param works:string[]  The work names.
 *
 * @overload Automator work.
 * @param opts:Object     The work options.
 * @param works:string[]  The work names.
 */
function register(...args) {
  const justo = Loader.importJusto();
  var opts, work;

  //(1) arguments
  if (args.length < 2) {
    throw new Error("Invalid number of arguments. At least, expected two: name/options and function/options/string[].");
  } else if (args.length >= 2) {
    [opts, work] = args;
  }

  if (typeof(opts) == "string") opts = {name: opts};
  if (!opts || !opts.name) throw new Error("Expected work name.");

  //(2) register
  if (typeof(work) == "function" || work instanceof Array) addAutomatorWork(opts, work);
  else addTesterWork(opts, work);

  //helpers
  function addTesterWork(regOpts, workOpts) {
    works.add(new TesterWork(regOpts, workOpts));
  }

  function addAutomatorWork(opts, work) {
    var workflow = justo.workflow, task;

    //(1) create task if needed
    if (work instanceof Function) {
      if (work.__task__) task = work;   //register task
      else task = workflow(opts, work); //register workflow using flow function
    } else {  //register() has been invoked with an array of strings
      task = workflow(opts, function(params) {
        //previously, checkWorks() has been run and this garantees the workflows to exist
        for (let name of work) {
          works[name].task(name, ...params);
        }
      });

      task.checkWorks = function() {
        for (let name of item) {
          if (!works.exists(name)) throw new Error(`The '${name}' work is not registered.`);
        }
      };
    }

    //(2) register
    works.add(new AutomatorWork(opts, task));
  }
}
