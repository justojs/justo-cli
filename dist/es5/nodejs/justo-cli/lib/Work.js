"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 






Work = (function () {





  function Work(opts) {_classCallCheck(this, Work);
    Object.defineProperty(this, "name", { value: opts.name, enumerable: true });
    Object.defineProperty(this, "description", { value: opts.desc || opts.description || "", enumerable: true });}_createClass(Work, [{ key: "isAutomatorWork", value: 















    function isAutomatorWork() {
      throw new Error("Abstract method.");} }, { key: "isTesterWork", value: 








    function isTesterWork() {
      throw new Error("Abstract method.");} }, { key: "isMacroWork", value: 








    function isMacroWork() {
      throw new Error("Abstract method.");} }, { key: "desc", get: function get() {return this.description;} }]);return Work;})();exports["default"] = Work;module.exports = exports["default"];
