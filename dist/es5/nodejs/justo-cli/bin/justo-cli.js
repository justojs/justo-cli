#!/usr/bin/env node
"use strict";

//imports
const path = require("path");
const yargs = require("yargs");
const automator = require("../lib/automator");

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
  .option("generate", {
    alias: "g",
    describe: "Generate the Justo.json file in the current directory.",
    type: "boolean",
    default: false
  })
  .epilogue(`Copyright (c) 2015 ${pkg.author.name}.\nProudly made with ♥ in Valencia, Spain, EU.`)
  .argv;

//(3) run
if (opts.generate) {
  require("../lib/JustoJson").generate("./Justo.json");
} else {
  require("../lib/automator")("./Justo.json", opts._);
}
