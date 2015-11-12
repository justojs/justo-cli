"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _justoFs = require(
"justo-fs");var 




JustoJsonParser = (function () {function JustoJsonParser() {_classCallCheck(this, JustoJsonParser);}_createClass(JustoJsonParser, null, [{ key: "parse", value: 






    function parse(fp) {
      var file;


      file = new _justoFs.File(fp);
      if (!file.exists()) throw new Error("The '" + fp + "' file doesn't exist or this can't be accessed.");


      return file.json;} }]);return JustoJsonParser;})();exports["default"] = JustoJsonParser;module.exports = exports["default"];
