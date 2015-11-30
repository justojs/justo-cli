//imports
import path from "path";
import Cli from "./Cli";
import Works from "./Works";
import AutomatorWork from "./AutomatorWork";
import MacroWork from "./MacroWork";
import TesterWork from "./TesterWork";
import JustoJson from "./JustoJson";
import Calls from "./Calls";

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
    justo.initialize(JustoJson.config);

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
  if (work instanceof Function) {
    var workflow = justo.workflow, task;

    if (work.__task__) work = new AutomatorWork(opts, work);
    else work = new AutomatorWork(opts, workflow(opts, work));
  } else if (work instanceof Array) {
    work = new MacroWork(opts, Calls.parse(work));
  } else {
    work = new TesterWork(opts, work);
  }

  works.add(work);

  //helpers
  function addTesterWork(regOpts, workOpts) {
    works.add(new TesterWork(regOpts, workOpts));
  }

  function addAutomatorWork(opts, work) {


    //(2) register
    works.add(work);
  }
}
