"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = (function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};})();exports.run = run;exports.list = list;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;} else {return Array.from(arr);}}var _path = require(
"path");var _path2 = _interopRequireDefault(_path);var _textTable = require(
"text-table");var _textTable2 = _interopRequireDefault(_textTable);var _JustoJson = require(
"../JustoJson");var _JustoJson2 = _interopRequireDefault(_JustoJson);var _Call = require(
"./Call");var _Call2 = _interopRequireDefault(_Call);var _Registers = require(
"./Registers");var _Registers2 = _interopRequireDefault(_Registers);


var registers = new _Registers2["default"]();


function register(name) {
  var opts, item, task, workflow;for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}


  if (args.length === 0) {
    throw new Error("Invalid number of arguments. Expected at least two arguments: name and function or array.");} else 
  if (args.length == 1) {
    if (args[0] instanceof Function) item = args[0];else 
    if (args[0] instanceof Array) item = args[0];else 
    throw new Error("Invalid argument. Expected function or array.");} else 
  if (args.length >= 2) {
    opts = args[0];item = args[1];}


  if (!opts) opts = {};


  workflow = require(_path2["default"].join(process.cwd(), "node_modules", "justo")).workflow;

  if (item instanceof Function) {
    if (item.__task__) task = item;else 
    task = workflow(name, opts, item);} else 
  {
    task = workflow(name, opts, function (params) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
        for (var _iterator = item[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var _registers$title;var title = _step.value;
          (_registers$title = registers[title]).task.apply(_registers$title, [title].concat(_toConsumableArray(params)));}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}});



    task.checkWorkflows = function () {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
        for (var _iterator2 = item[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var i = _step2.value;
          if (!registers.exists(i)) throw new Error("The '" + i + "' workflow is not registered.");}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2["return"]) {_iterator2["return"]();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}};}





  registers.add(name, opts, task);}





function load(file) {
  var config, autom, main;


  config = _JustoJson2["default"].parse(file);

  if (!config.automator) config.automator = { main: "./Justo.js" };
  if (!config.automator.main) config.automator.main = { main: "./Justo.js" };


  autom = require(_path2["default"].join(process.cwd(), "node_modules", "justo"))("automator", config, { register: register });


  main = _path2["default"].normalize(_path2["default"].join(process.cwd(), config.automator.main));
  require(main);


  return autom;}





function run(file, parseCall, calls) {
  var autom;


  autom = load(file);


  if (calls.length === 0) calls = ["default"];

  for (var i = 0; i < calls.length; ++i) {
    var title = undefined, params = undefined, task = undefined;var _parse = 


    parse(calls[i]);var _parse2 = _slicedToArray(_parse, 2);title = _parse2[0];params = _parse2[1];


    if (!registers.exists(title)) throw new Error("The '" + title + "' work is not registered.");
    task = registers[title].task;
    if (task.checkWorkflows) task.checkWorkflows();


    calls[i] = new _Call2["default"](title, task, params);}var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {



    for (var _iterator3 = calls[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var call = _step3.value;
      autom.start(call.title);
      if (call.isSimple()) call.task.apply(call, [call.title].concat(_toConsumableArray(call.params)));else 
      call.task.apply(call, ["  "].concat(_toConsumableArray(call.params)));
      autom.end();}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3["return"]) {_iterator3["return"]();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}



  function parse(call) {
    var title, params;


    if (call.indexOf(":") > 0) {
      title = call.substr(0, call.indexOf(":"));
      params = call.split(":").slice(1);

      if (parseCall) {
        for (var i = 0; i < params.length; ++i) {
          var param = params[i];

          if (isNaN(Number(param))) {
            if (/^['"].*['"]$/.test(param)) param = param.replace(/['"]/, "");} else 
          {
            param = Number(param);}


          params[i] = param;}}} else 


    {
      title = call;
      params = [];}



    return [title, params];}}






function list(file) {
  var tbl = [];


  load(file);var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {


    for (var _iterator4 = Object.keys(registers).sort()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var _name = _step4.value;
      var reg = registers[_name];
      tbl.push([reg.title, reg.description]);}} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4["return"]) {_iterator4["return"]();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}



  console.log((0, _textTable2["default"])(tbl));}
