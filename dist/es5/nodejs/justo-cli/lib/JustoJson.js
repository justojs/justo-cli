"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _justoFs = require(
"justo-fs");var 




JustoJson = (function () {function JustoJson() {_classCallCheck(this, JustoJson);}_createClass(JustoJson, null, [{ key: "parse", value: 






    function parse(file) {

      file = new _justoFs.File(file);
      if (!file.exists()) throw new Error("The '" + file.path + "' file doesn't exist or this can't be accessed.");


      return file.json;} }, { key: "generate", value: 







    function generate(file) {
      file = new _justoFs.File(file);
      file.create();
      file.json = { 
        automator: { 
          name: "app", 
          main: "Justo.js" } };} }]);return JustoJson;})();exports["default"] = JustoJson;module.exports = exports["default"];
