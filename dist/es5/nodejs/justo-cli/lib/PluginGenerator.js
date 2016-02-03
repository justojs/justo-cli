"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _path = require("path");var _path2 = _interopRequireDefault(_path);var _justoFs = require("justo-fs");var 

fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 




PluginGenerator = function () {function PluginGenerator() {_classCallCheck(this, PluginGenerator);}_createClass(PluginGenerator, null, [{ key: "generate", value: function generate(





    dir) {
      fs.copy(_path2.default.join(__dirname, "../template/plugin"), dir);
      new fs.Dir(dir, "lib").create();
      new fs.Dir(dir, "test/unit/data").create();
      fs.rename(dir + "/_package.json", "package.json");
      fs.rename(dir + "/_editorconfig", ".editorconfig");
      fs.rename(dir + "/_gitignore", ".gitignore");
      fs.rename(dir + "/_jshintrc", ".jshintrc");} }]);return PluginGenerator;}();exports.default = PluginGenerator;
