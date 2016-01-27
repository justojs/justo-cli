"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _path = require(
"path");var _path2 = _interopRequireDefault(_path);var _justoFs = require(
"justo-fs");var 




PackageJson = (function () {function PackageJson() {_classCallCheck(this, PackageJson);}_createClass(PackageJson, null, [{ key: "generate", value: 





    function generate(file) {
      file = new _justoFs.File(file);
      file.json = {};} }]);return PackageJson;})();exports["default"] = PackageJson;module.exports = exports["default"];
