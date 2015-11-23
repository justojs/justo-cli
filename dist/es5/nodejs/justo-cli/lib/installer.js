"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.install = install;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}var _os = require(
"os");var _os2 = _interopRequireDefault(_os);var _child_process = require(
"child_process");var _child_process2 = _interopRequireDefault(_child_process);




function install() {
  var res, cmd;


  if (/^win/.test(_os2["default"].platform())) cmd = "npm.cmd";else 
  cmd = "npm";


  console.log("Installing packages...");
  res = _child_process2["default"].spawnSync(cmd, ["install", "--save-dev", "justo"]);


  if (res.stdout) console.log(res.stdout.toString());
  if (res.error) {
    console.log(res.stderr.toString());
    console.log(res.error.toString());}}
