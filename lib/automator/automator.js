//imports
import path from "path";
import table from "text-table";
import JustoJson from "../JustoJson";
import Call from "./Call";
import Registers from "./Registers";

//data
var registers = new Registers();

//helper
function register(name, ...args) {
  var opts, item, task, workflow;

  //(1) arguments
  if (args.length === 0) {
    throw new Error("Invalid number of arguments. Expected at least two arguments: name and function or array.");
  } else if (args.length == 1) {
    if (args[0] instanceof Function) item = args[0];
    else if (args[0] instanceof Array) item = args[0];
    else throw new Error("Invalid argument. Expected function or array.");
  } else if (args.length >= 2) {
    [opts, item] = args;
  }

  if (!opts) opts = {};

  //(2) create task
  workflow = require(path.join(process.cwd(), "node_modules", "justo")).workflow;

  if (item instanceof Function) {
    if (item.__task__) task = item;
    else task = workflow(name, opts, item);
  } else {
    task = workflow(name, opts, function(params) {
      for (let title of item) {
        registers[title].task(title, ...params);
      }
    });

    task.checkWorkflows = function() {
      for (let i of item) {
        if (!registers.exists(i)) throw new Error(`The '${i}' workflow is not registered.`);
      }
    };
  }

  //(3) register
  registers.add(name, opts, task);
}

/**
 * Load.
 */
function load(file) {
  var config, autom, main;

  //(1) read configuration
  config = JustoJson.parse(file);

  if (!config.automator) config.automator = {main: "./Justo.js"};
  if (!config.automator.main) config.automator.main = {main: "./Justo.js"};

  //(2) create automator
  autom = require(path.join(process.cwd(), "node_modules", "justo"))("automator", config, {register});

  //(3) load main file
  main = path.normalize(path.join(process.cwd(), config.automator.main));
  require(main);

  //(4) return automator
  return autom;
}

/**
 * Load and run the automator.
 */
export function run(file, parseCall, calls) {
  var autom;

  //(1) load
  autom = load(file);

  //(2) check works to call
  if (calls.length === 0) calls = ["default"];

  for (let i = 0; i < calls.length; ++i) {
    let title, params, task;

    //parse call
    [title, params] = parse(calls[i]);

    //check work
    if (!registers.exists(title)) throw new Error(`The '${title}' work is not registered.`);
    task = registers[title].task;
    if (task.checkWorkflows) task.checkWorkflows();

    //replace call by call object
    calls[i] = new Call(title, task, params);
  }

  //(3) run calls
  for (let call of calls) {
    autom.start(call.title);
    if (call.isSimple()) call.task(call.title, ...call.params);
    else call.task("  ", ...call.params);
    autom.end();
  }

  //helper
  function parse(call) {
    var title, params;

    //(1) parse
    if (call.indexOf(":") > 0) {
      title = call.substr(0, call.indexOf(":"));
      params = call.split(":").slice(1);

      if (parseCall) {
        for (let i = 0; i < params.length; ++i) {
          let param = params[i];

          if (isNaN(Number(param))) {
            if (/^['"].*['"]$/.test(param)) param = param.replace(/['"]/, "");
          } else {
            param = Number(param);
          }

          params[i] = param;
        }
      }
    } else {
      title = call;
      params = [];
    }

    //(2) return
    return [title, params];
  }
}

/**
 * Load and list the registered works.
 */
export function list(file) {
  var tbl = [];

  //(1) load
  load(file);

  //(2) get rows
  for (let name of Object.keys(registers).sort()) {
    let reg = registers[name];
    tbl.push([reg.title, reg.description]);
  }

  //(3) display
  console.log(table(tbl));
}
