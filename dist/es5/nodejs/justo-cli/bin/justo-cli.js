#!/usr/bin/env node
"use strict";

//imports
const path = require("path");
const yargs = require("yargs");
const JustoJsonParser = require("../lib/JustoJsonParser");

//////////
// main //
//////////
var pkg, opts;

//(1) get package.json info
pkg = require("../package.json");

//(2) get arguments
opts = yargs
  .usage("Usage: justo [options]")
  .help("help")
  .version(pkg.version, "version", "Display the Justo.js version.")
  .option("a", {
    alias: "automator",
    default: "./Justo.json",
    describe: "Run the engine in automation mode, using the config file indicated.",
    type: "string"
  })
  // .option("g", {
  //   alias: "generator",
  //   describe: "Run a generator.",
  //   type: "string"
  // })
  .epilogue(`Copyright (c) 2015 ${pkg.author.name}.\nProudly made with ♥ in Valencia, Spain, EU.`)
  .argv;

//(3) run
automator(opts.automator || "./Justo.json");

/**
 * Load and run the automator.
 */
function automator(file) {
  var config, autom;

  //(1) read configuration
  config = JustoJsonParser.parse(file);
  config.arguments = opts._;

  //(2) create automator
  autom = require(path.join(process.cwd(), "node_modules", "justo"))("automator", config);

  //(3) run files
  for (let f of config.automator.files) {
    f = path.normalize(path.join(process.cwd(), f));

    autom.start(f);
    require(f);
    autom.end(f);
  }
}
