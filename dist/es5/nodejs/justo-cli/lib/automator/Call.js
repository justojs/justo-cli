"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Call = (function () {
  function Call(title, task, params) {_classCallCheck(this, Call);
    Object.defineProperty(this, "title", { value: title, enumerable: true });
    Object.defineProperty(this, "task", { value: task, enumerable: true });
    Object.defineProperty(this, "params", { value: params, enumerable: true });}_createClass(Call, [{ key: "isSimple", value: 






    function isSimple() {
      return this.task.__task__.isSimple();} }, { key: "description", get: function get() {return this.task.__task__.description;} }]);return Call;})();exports["default"] = Call;module.exports = exports["default"];
