//imports
import path from "path";
import JustoJson from "./JustoJson";
import Call from "./Call";
import Workflow from "./Workflow";
import {inject} from "justo-injector";

//data
var workflows = {};

//helper
function register(title, fn) {
  workflows[title] = new Workflow(title, fn);
}

/**
 * Load and run the automator.
 */
export default function automator(file, calls) {
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

  //(4) check workflows
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

  //(5) run workflows
  for (let call of calls) {
    let params = inject({logger: autom.loggers, log: autom.loggers, params: call.params}, call.fn);

    autom.start(call.title);
    call.fn(...params);
    autom.end(call.title);
  }
}
