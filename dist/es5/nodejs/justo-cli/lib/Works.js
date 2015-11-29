"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _AutomatorWork = require(
"./AutomatorWork");var _AutomatorWork2 = _interopRequireDefault(_AutomatorWork);var _TesterWork = require(
"./TesterWork");var _TesterWork2 = _interopRequireDefault(_TesterWork);var 




Works = (function () {function Works() {_classCallCheck(this, Works);}_createClass(Works, [{ key: "add", value: 





    function add(work) {
      this[work.name] = work;} }, { key: "exists", value: 








    function exists(name) {
      return !!this[name];} }]);return Works;})();exports["default"] = Works;module.exports = exports["default"];
