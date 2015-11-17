"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _Register = require(
"./Register");var _Register2 = _interopRequireDefault(_Register);var 




Registers = (function () {function Registers() {_classCallCheck(this, Registers);}_createClass(Registers, [{ key: "add", value: 







    function add(title, opts, task) {
      this[title] = new _Register2["default"](title, opts, task);} }, { key: "exists", value: 








    function exists(title) {
      return !!this[title];} }]);return Registers;})();exports["default"] = Registers;module.exports = exports["default"];
