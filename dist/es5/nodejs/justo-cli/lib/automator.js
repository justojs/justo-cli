"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = 

















automator;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;} else {return Array.from(arr);}}var _path = require("path");var _path2 = _interopRequireDefault(_path);var _JustoJson = require("./JustoJson");var _JustoJson2 = _interopRequireDefault(_JustoJson);var _Call = require("./Call");var _Call2 = _interopRequireDefault(_Call);var _Workflow = require("./Workflow");var _Workflow2 = _interopRequireDefault(_Workflow);var _justoInjector = require("justo-injector");var workflows = {};function register(title, fn) {workflows[title] = new _Workflow2["default"](title, fn);}function automator(file, calls) {
  var config, autom, main;


  config = _JustoJson2["default"].parse(file);

  if (!config.automator) config.automator = { main: "./Justo.js" };
  if (!config.automator.main) config.automator.main = { main: "./Justo.js" };


  autom = require(_path2["default"].join(process.cwd(), "node_modules", "justo"))("automator", config, { register: register });


  main = _path2["default"].normalize(_path2["default"].join(process.cwd(), config.automator.main));
  require(main);


  for (var i = 0; i < calls.length; ++i) {
    var call = undefined, title = undefined, params = undefined, wf = undefined;


    call = calls[i];

    if (call.includes(":")) {
      title = call.split(":")[0];
      params = call.split(":").slice(1);} else 
    {
      title = call;
      params = [];}



    wf = workflows[title];
    if (!wf) throw new Error("The '" + title + "' workflow doesn't exist.");


    calls[i] = new _Call2["default"](wf, params);}var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {



    for (var _iterator = calls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var call = _step.value;
      var params = (0, _justoInjector.inject)({ logger: autom.loggers, log: autom.loggers, params: call.params }, call.fn);

      autom.start(call.title);
      call.fn.apply(call, _toConsumableArray(params));
      autom.end(call.title);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}}module.exports = exports["default"];
