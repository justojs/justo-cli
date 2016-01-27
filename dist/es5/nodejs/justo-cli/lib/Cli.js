"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _os = require(
"os");var _os2 = _interopRequireDefault(_os);var _child_process = require(
"child_process");var _child_process2 = _interopRequireDefault(_child_process);var _JustoJson = require(
"./JustoJson");var _JustoJson2 = _interopRequireDefault(_JustoJson);var _JustoJs = require(
"./JustoJs");var _JustoJs2 = _interopRequireDefault(_JustoJs);var _PackageJson = require(
"./PackageJson");var _PackageJson2 = _interopRequireDefault(_PackageJson);var 




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
      _JustoJson2["default"].generate(path);} }, { key: "generateJustoJs", value: 







    function generateJustoJs(path) {
      _JustoJs2["default"].generate(path);} }, { key: "generatePackageJson", value: 







    function generatePackageJson(path) {
      _PackageJson2["default"].generate(path);} }, { key: "listCatalogedTasks", value: 







    function listCatalogedTasks(path) {
      var Loader = require("justo-loader").Loader;
      var table = require("text-table");
      var justo, config, tbl;


      config = _JustoJson2["default"].read(path);
      justo = Loader.loadJusto();
      justo.initialize(config);
      Loader.load(config.runner.main);


      tbl = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
        for (var _iterator = Object.keys(justo.runner.catalog.tasks).sort()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var _name = _step.value;
          var task = justo.runner.catalog.get(_name).__task__;

          tbl.push([
          task.name, 
          task.desc || ""]);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}



      if (tbl.length > 0) tbl = [["Name", "Description"]].concat(tbl);
      console.log(table(tbl));} }, { key: "runCatalogedTasks", value: 









    function runCatalogedTasks(justojson, calls, opts) {
      var Loader = require("justo-loader").Loader;
      var Calls = require("./Calls");
      var justo;


      if (!calls || calls.length === 0) calls = ["default"];
      if (!opts) opts = { parse: false, only: false };


      justojson = _JustoJson2["default"].read(justojson);
      if (opts.hasOwnProperty("only")) justojson.runner.only = opts.only;
      justo = Loader.loadJusto();
      justo.initialize(justojson);
      Loader.load(justojson.runner.main);


      justo.runner.runCatalogedTasks(Calls.parse(calls, opts));} }]);return Cli;})();exports["default"] = Cli;module.exports = exports["default"];
