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
  .usage("Usage: justo [options] [works]")
  .option("g", {
    alias: "generate",
    describe: "Generate the Justo.json file in the current directory.",
    type: "boolean",
    default: false
  })
  .help("h", "Show help.")
  .alias("h", "help")
  .option("i", {
    alias: "install",
    describe: "Install the Justo.js packages. Require npm installed.",
    type: "boolean",
    default: false
  })
  .option("l", {
    alias: "list",
    describe: "List the registered works into the Justo.js file.",
    type: "boolean",
    default: false
  })
  .option("p", {
    alias: "parse",
    describe: "Parse the work parameters.",
    type: "boolean",
    default: false
  })
  .version(pkg.version, "v", "Show CLI version.")
  .alias("v", "version")
  .epilogue(`Bugs: https://github.com/justojs/justo-issues\n\nProudly made with ♥ in Valencia, Spain, EU.\nCopyright (c) ${pkg.years} ${pkg.author.name}.\nIn memory of Justo González Mallols.`)
  .argv;

//(3) run
if (opts.generate) {
  require("../lib/JustoJson").generate("./Justo.json");
} else if (opts.install) {
  require("../lib/installer").install();
} else if (opts.list) {
  require("../lib/automator/automator").list("./Justo.json");
} else {
  require("../lib/automator/automator").run("./Justo.json", opts.parse, opts._);
}
