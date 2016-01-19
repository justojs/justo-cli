"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _os = require(
"os");var _os2 = _interopRequireDefault(_os);var _child_process = require(
"child_process");var _child_process2 = _interopRequireDefault(_child_process);var _JustoJson = require(
"./JustoJson");var _JustoJson2 = _interopRequireDefault(_JustoJson);var 




Cli = (function () {function Cli() {_classCallCheck(this, Cli);}_createClass(Cli, null, [{ key: "installJusto", value: 



    function installJusto() {
      var res, cmd;


      if (/^win/.test(_os2["default"].platform())) cmd = "npm.cmd";else 
      cmd = "npm";


      console.log("Installing packages...");
      res = _child_process2["default"].spawnSync(cmd, ["install", "--save-dev", "justo"]);


      if (res.stdout) console.log(res.stdout.toString());
      if (res.error) {
        console.log(res.stderr.toString());
        console.log(res.error.toString());}} }, { key: "generateJustoJson", value: 








    function generateJustoJson(path) {
      _JustoJson2["default"].generate(path);} }, { key: "listRegisteredWorks", value: 







    function listRegisteredWorks(path) {
      var Loader = require("./Loader");
      var table = require("text-table");
      var works, tbl;


      _JustoJson2["default"].read(path);
      works = Loader.loadJustoJs(_JustoJson2["default"].runner.main);


      tbl = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

        for (var _iterator = Object.keys(works).sort()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var _name = _step.value;
          var work = works[_name];
          tbl.push([
          work.name, 
          work.isTesterWork() ? "test" : work.isAutomatorWork() ? "autom" : "macro", 
          work.desc]);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}



      if (tbl.length > 0) tbl = [["Name", "Type", "Description"]].concat(tbl);
      console.log(table(tbl));} }, { key: "runWorks", value: 









    function runWorks(justojson, calls, opts) {
      var Loader = require("./Loader");
      var Runner = require("./Runner");
      var Calls = require("./Calls");
      var works;


      if (!calls || calls.length === 0) calls = ["default"];
      if (!opts) opts = { parse: false, only: false };


      justojson = _JustoJson2["default"].read(justojson);
      works = Loader.loadJustoJs(justojson.runner.main, { only: opts.only });


      Runner.run(Calls.parse(calls, opts), works);} }]);return Cli;})();exports["default"] = Cli;module.exports = exports["default"];
