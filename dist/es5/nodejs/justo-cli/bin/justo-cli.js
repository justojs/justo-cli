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
    "\n  justo [-m] -g generator [command] [parameters]" +
    "\n  justo [-m] -g generator help [command]" +
    "\n  justo [-m] -g generator dst"
  )
  .option("c", {
    alias: "catalog",
    describe: "List the cataloged tasks into the Justo.js file.",
    type: "boolean",
    default: false
  })
  .option("d", {
    alias: "download",
    describe: "URL for the standalone project.",
    type: "string"
  })
  .option("D", {
    alias: "dir",
    describe: "Directory where to change if -d option.",
    type: "string"
  })
  .option("debug", {
    describe: "Show more info when error caught by Justo.",
    type: "boolean",
    default: false
  })
  .option("g", {
    alias: "generate",
    describe: "Run the specified generator.",
    type: "string"
  })
  .help("h", "Show help.")
  // .alias("h", "help")
  .option("issue", {
    describe: "Show how to notify an issue.",
    type: "boolean",
    default: false
  })
  .option("m", {
    alias: "mute",
    describe: "Mute the reporter.",
    type: "boolean",
    default: false
  })
  .option("o", {
    alias: "only",
    describe: "Only run suites and tests fixed as only.",
    type: "boolean",
    default: false
  })
  .version("v", "Show CLI version.", pkg.version)
  .alias("v", "version")
  .epilogue(`Proudly made with ♥ in Valencia, Spain, EU.\nCopyright (c) ${pkg.years} ${pkg.author.name}.\nIn memory of Justo González Mallols.`)
  .argv;

//(3) run
if (opts.issue) {
  console.log("Web: https://github.com/justojs/justo-issues\nEmail: issues@justojs.org");
} else if (opts.generate) {
  let res;

  try {
    Cli.generate("./Justo.json", opts.generate.toLowerCase(), opts._, {mute: opts.mute});
    res = 0;
  }  catch (e) {
    if (opts.debug) console.error(e);
    else console.error(e.message);

    res = 1;
  }

  process.exit(res);
} else if (opts.catalog) {
  Cli.listCatalogedTasks("./Justo.json");
} else {
  let res;

  try {
    if (opts.download) res = Cli.downloadAndRunCatalogedTasks(opts.download, opts.dir, "./Justo.json", opts._, {only: opts.only});
    else res = Cli.runCatalogedTasks("./Justo.json", opts._, {only: opts.only});
  } catch (e) {
    if (opts.debug) console.error(e);
    else console.error(e.message);

    res = {
      state: {
        name: "FAILED"
      }
    };
  }

  if (res.state.name == "FAILED") process.exit(1);
  else process.exit();
}
