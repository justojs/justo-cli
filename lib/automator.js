//imports
import path from "path";
import JustoJson from "./JustoJson";
import Call from "./Call";
import Workflow from "./Workflow";
import {inject} from "justo-injector";

//data
var workflows = {};

//helper
function register(opts, fn) {
  let workflow = new Workflow(opts, fn);
  workflows[workflow.title] = workflow;
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
export function run(file, calls) {
  var autom;

  //(1) load
  autom = load(file);

  //(2) check workflows to call
  for (let i = 0; i < calls.length; ++i) {
    let call, title, params, wf;

    //parse call
    call = calls[i];

    if (call.includes(":")) {
      title = call.split(":")[0];
      params = call.split(":").slice(1);
    } else {
      title = call;
      params = [];
    }

    //check workflow
    wf = workflows[title];
    if (!wf) throw new Error(`The '${title}' workflow doesn't exist.`);

    //replace call by call object
    calls[i] = new Call(wf, params);
  }

  //(3) run calls
  for (let call of calls) {
    let params = inject({logger: autom.loggers, log: autom.loggers, params: call.params}, call.fn);

    autom.start(call.title);
    call.fn(...params);
    autom.end(call.title);
  }
}

/**
 * Load and list the registered workflows.
 */
export function list(file) {
  //(1) load
  load(file);

  //(2) list
  for (let name of Object.keys(workflows)) {
    let wf = workflows[name];
    console.log("  ", wf.title, "\t", wf.description ? wf.description : "");
  }
}
