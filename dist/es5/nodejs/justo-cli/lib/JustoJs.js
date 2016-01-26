"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _path = require(
"path");var _path2 = _interopRequireDefault(_path);var _justoFs = require(
"justo-fs");var 




JustoJs = (function () {function JustoJs() {_classCallCheck(this, JustoJs);}_createClass(JustoJs, null, [{ key: "generate", value: 





    function generate(file) {
      file = new _justoFs.File(file);
      file.text = "//imports\nconst register = require(\"justo\").register;\n\n" + 
      "//tasks\nregister({name: \"default\", desc: \"Default task.\"}, []);";} }]);return JustoJs;})();exports["default"] = JustoJs;module.exports = exports["default"];
