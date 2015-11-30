"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _Loader = require(
"./Loader");var _Loader2 = _interopRequireDefault(_Loader);var 




Runner = (function () {function Runner() {_classCallCheck(this, Runner);}_createClass(Runner, null, [{ key: "run", value: 






    function run(calls, works) {
      var justo = _Loader2["default"].importJusto();var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


        for (var _iterator = calls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var call = _step.value;
          if (!works.exists(call.name)) throw new Error("No '" + call.name + "' work has been registered.");}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {



        for (var _iterator2 = calls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var call = _step2.value;
          var work = works[call.name];

          if (work.isMacroWork()) justo.run(work, work.getWorks(works));else 
          if (work.isAutomatorWork()) justo.run(work, call.params);else 
          justo.run(work);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2["return"]) {_iterator2["return"]();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}} }]);return Runner;})();exports["default"] = Runner;module.exports = exports["default"];
