"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _path = require(
"path");var _path2 = _interopRequireDefault(_path);var _Cli = require(
"./Cli");var _Cli2 = _interopRequireDefault(_Cli);var _Works = require(
"./Works");var _Works2 = _interopRequireDefault(_Works);var _AutomatorWork = require(
"./AutomatorWork");var _AutomatorWork2 = _interopRequireDefault(_AutomatorWork);var _MacroWork = require(
"./MacroWork");var _MacroWork2 = _interopRequireDefault(_MacroWork);var _TesterWork = require(
"./TesterWork");var _TesterWork2 = _interopRequireDefault(_TesterWork);var _JustoJson = require(
"./JustoJson");var _JustoJson2 = _interopRequireDefault(_JustoJson);var _Calls = require(
"./Calls");var _Calls2 = _interopRequireDefault(_Calls);


var JUSTO = _path2["default"].join(process.cwd(), "node_modules", "justo");
var works;var 




Loader = (function () {function Loader() {_classCallCheck(this, Loader);}_createClass(Loader, null, [{ key: "loadJustoJs", value: 






    function loadJustoJs(file) {var opts = arguments.length <= 1 || arguments[1] === undefined ? { only: false } : arguments[1];
      var justo, autom;


      justo = Loader.importJusto();
      justo.initialize(Object.assign({ only: opts.only }, _JustoJson2["default"].config));


      justo.publish(register);

      works = new _Works2["default"]();
      require(_path2["default"].join(process.cwd(), file));

      justo.unpublish(register);


      return works;} }, { key: "importJusto", value: 





    function importJusto() {
      return require(JUSTO);} }]);return Loader;})();exports["default"] = Loader;






























function register() {
  var justo = Loader.importJusto();
  var opts, work;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


  if (args.length < 2) {
    throw new Error("Invalid number of arguments. At least, expected two: name/options and function/options/string[].");} else 
  if (args.length >= 2) {
    opts = args[0];work = args[1];}


  if (typeof opts == "string") opts = { name: opts };
  if (!opts || !opts.name) throw new Error("Expected work name.");


  if (work instanceof Function) {
    var workflow = justo.workflow, task;

    if (work.__task__) work = new _AutomatorWork2["default"](opts, work);else 
    work = new _AutomatorWork2["default"](opts, workflow(opts, work));} else 
  if (work instanceof Array) {
    work = new _MacroWork2["default"](opts, _Calls2["default"].parse(work));} else 
  {
    work = new _TesterWork2["default"](opts, work);}


  works.add(work);


  function addTesterWork(regOpts, workOpts) {
    works.add(new _TesterWork2["default"](regOpts, workOpts));}


  function addAutomatorWork(opts, work) {



    works.add(work);}}module.exports = exports["default"];
