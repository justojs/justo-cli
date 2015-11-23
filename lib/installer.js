//imports
import os from "os";
import child_process from "child_process";

/**
 * Install the Justo.js packages.
 */
export function install() {
  var res, cmd;

  //(1) determine command
  if (/^win/.test(os.platform())) cmd = "npm.cmd";
  else cmd = "npm";

  //(1) run
  console.log("Installing packages...");
  res = child_process.spawnSync(cmd, ["install", "--save-dev", "justo"]);

  //(2) show output
  if (res.stdout) console.log(res.stdout.toString());
  if (res.error) {
    console.log(res.stderr.toString());
    console.log(res.error.toString());
  }
}
