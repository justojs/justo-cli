"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoFs = require("justo-fs");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}


var config;var




JustoJson = function () {function JustoJson() {_classCallCheck(this, JustoJson);}_createClass(JustoJson, null, [{ key: "read", value: function read()





    {var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (file) {
        file = new _justoFs.File(file);
        config = file.exists() ? file.json : {};
      } else {
        config = {};
      }


      if (!config.generator) config.generator = {};
      if (!config.runner) config.runner = { main: "./Justo.js" };
      if (!config.runner.main) config.runner.main = "./Justo.js";
      if (!config.runner.main.startsWith(".")) config.runner.main = _path2.default.join(".", config.runner.main);
      config.runner.main = _path2.default.normalize(config.runner.main);
      if (!config.runner.onError) config.runner.onError = "continue";

      if (!config.reporter) config.reporter = { type: "coloredConsole" };


      return config;
    } }, { key: "config", get: function get()

    {
      return config;
    } }, { key: "runner", get: function get()






    {
      return config.runner;
    } }, { key: "automator", get: function get()






    {
      return config.automator;
    } }, { key: "tester", get: function get()






    {
      return config.tester;
    } }]);return JustoJson;}();exports.default = JustoJson;
