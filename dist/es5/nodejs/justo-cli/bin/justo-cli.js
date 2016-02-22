#!/usr/bin/env node

"use strict";

//imports
const path = require("path");
const yargs = require("yargs");
const Cli = require("../lib/Cli").default;

//////////
// main //
//////////
var pkg, opts;

//(1) get package.json info
pkg = require("../package.json");

//(2) get arguments
opts = yargs
  .usage(
    "\nUsage:" +
    "\n  justo [options] [tasks]" +
    "\n  justo -g generator [command] [parameters]" +
    "\n  justo -g generator help [command]"
  )
  .option("g", {
    alias: "generate",
    describe: "Run the specified generator.",
    type: "string"
  })
  .help("h", "Show help.")
  .alias("h", "help")
  .option("l", {
    alias: "list",
    describe: "List the cataloged tasks into the Justo.js file.",
    type: "boolean",
    default: false
  })
  .option("o", {
    alias: "only",
    describe: "Only run suites and tests fixed as only.",
    type: "boolean",
    default: false
  })
  .option("p", {
    alias: "parse",
    describe: "Parse the task parameters.",
    type: "boolean",
    default: false
  })
  .version("v", "Show CLI version.", pkg.version)
  .alias("v", "version")
  .epilogue(`Bugs: github.com/justojs/justo-issues\n      issues@justojs.org\n\nProudly made with ♥ in Valencia, Spain, EU.\nCopyright (c) ${pkg.years} ${pkg.author.name}.\nIn memory of Justo González Mallols.`)
  .argv;

//(3) run
if (opts.generate) {
  Cli.generate(opts.generate.toLowerCase(), opts._, {parse: opts.parse});
} else if (opts.list) {
  Cli.listCatalogedTasks("./Justo.json");
} else {
  Cli.runCatalogedTasks("./Justo.json", opts._, {parse: opts.parse, only: opts.only});
}
