#!/usr/bin/env node

"use strict";

//imports
const path = require("path");
const yargs = require("yargs");
const Cli = require("../lib/Cli.js");

//////////
// main //
//////////
var pkg, opts;

//(1) get package.json info
pkg = require("../package.json");

//(2) get arguments
opts = yargs
  .usage("Usage: justo [options] [tasks]")
  .option("g", {
    alias: "generate",
    describe: "Generate the Justo.json, Justo.js and package.json files in the current directory.",
    type: "string",
    choices: ["Justo.js", "justo.js", "Justo.json", "justo.json", "Justo.*", "justo.*", "package.json", "*"]
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
  .version(pkg.version, "v", "Show CLI version.")
  .alias("v", "version")
  .epilogue(`Bugs: github.com/justojs/justo-issues\n      issues@justojs.org\n\nProudly made with ♥ in Valencia, Spain, EU.\nCopyright (c) ${pkg.years} ${pkg.author.name}.\nIn memory of Justo González Mallols.`)
  .argv;

//(3) run
if (opts.generate) {
  let file = opts.generate.toLowerCase();

  if (file == "justo.*" || file == "*" || file == "justo.json") Cli.generateJustoJson("./Justo.json");
  if (file == "justo.*" || file == "*" || file == "justo.js") Cli.generateJustoJs("./Justo.js");
  if (file == "*" || file == "package.json") Cli.generatePackageJson("./package.json");
} else if (opts.install) Cli.installJusto();
else if (opts.list) Cli.listCatalogedTasks("./Justo.json");
else Cli.runCatalogedTasks("./Justo.json", opts._, {parse: opts.parse, only: opts.only});
