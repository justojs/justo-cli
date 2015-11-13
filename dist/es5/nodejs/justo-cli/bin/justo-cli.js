#!/usr/bin/env node
"use strict";

//imports
const path = require("path");
const yargs = require("yargs");

//////////
// main //
//////////
var pkg, opts;

//(1) get package.json info
pkg = require("../package.json");

//(2) get arguments
opts = yargs
  .usage("Usage: justo [options]")
  .help("h")
  .alias("h", "help")
  .version(pkg.version, "v", "Display the Justo.js version.")
  .alias("v", "version")
  .option("generate", {
    alias: "g",
    describe: "Generate the Justo.json file in the current directory.",
    type: "boolean",
    default: false
  })
  .option("list", {
    alias: "l",
    describe: "List the registered workflows into the Justo.js file.",
    type: "boolean",
    default: false
  })
  .epilogue(`Copyright (c) ${pkg.years} ${pkg.author.name}.\nProudly made with ♥ in Valencia, Spain, EU.\nIn memory of Justo González Mallols.`)
  .argv;

//(3) run
if (opts.generate) {
  require("../lib/JustoJson").generate("./Justo.json");
} else if (opts.list) {
  require("../lib/automator").list("./Justo.json");
} else {
  require("../lib/automator").run("./Justo.json", opts._);
}
