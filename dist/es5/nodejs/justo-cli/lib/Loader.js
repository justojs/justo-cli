"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _path = require(
"path");var _path2 = _interopRequireDefault(_path);var _Cli = require(
"./Cli");var _Cli2 = _interopRequireDefault(_Cli);var _Works = require(
"./Works");var _Works2 = _interopRequireDefault(_Works);var _AutomatorWork = require(
"./AutomatorWork");var _AutomatorWork2 = _interopRequireDefault(_AutomatorWork);var _TesterWork = require(
"./TesterWork");var _TesterWork2 = _interopRequireDefault(_TesterWork);


var JUSTO = _path2["default"].join(process.cwd(), "node_modules", "justo");
var works;var 




Loader = (function () {function Loader() {_classCallCheck(this, Loader);}_createClass(Loader, null, [{ key: "loadJustoJs", value: 





    function loadJustoJs(file) {
      var justo, autom;


      justo = Loader.importJusto();
      justo.initialize();


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


  if (typeof work == "function" || work instanceof Array) addAutomatorWork(opts, work);else 
  addTesterWork(opts, work);


  function addTesterWork(regOpts, workOpts) {
    works.add(new _TesterWork2["default"](regOpts, workOpts));}


  function addAutomatorWork(opts, work) {
    var workflow = justo.workflow, task;


    if (work instanceof Function) {
      if (work.__task__) task = work;else 
        task = workflow(opts, work);} else 
      {
        task = workflow(opts, function (params) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

            for (var _iterator = work[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var _works$_name;var _name = _step.value;
              (_works$_name = works[_name]).task.apply(_works$_name, [_name].concat(_toConsumableArray(params)));}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}});



        task.checkWorks = function () {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
            for (var _iterator2 = item[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var _name2 = _step2.value;
              if (!works.exists(_name2)) throw new Error("The '" + _name2 + "' work is not registered.");}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2["return"]) {_iterator2["return"]();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}};}





    works.add(new _AutomatorWork2["default"](opts, task));}}module.exports = exports["default"];
