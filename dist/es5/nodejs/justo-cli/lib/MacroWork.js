"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();var _get = function get(_x, _x2, _x3) {var _again = true;_function: while (_again) {var object = _x, property = _x2, receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {_x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}}};function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _Work2 = require(
"./Work");var _Work3 = _interopRequireDefault(_Work2);var 




MacroWork = (function (_Work) {_inherits(MacroWork, _Work);






  function MacroWork(opts, calls) {_classCallCheck(this, MacroWork);
    _get(Object.getPrototypeOf(MacroWork.prototype), "constructor", this).call(this, opts);
    Object.defineProperty(this, "calls", { value: calls, enumerable: true });}_createClass(MacroWork, [{ key: "getWorks", value: 








    function getWorks(works) {
      var res;


      res = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
        for (var _iterator = this.calls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var call = _step.value;
          var work = works[call.name];
          if (!work) throw new Error("The '" + call.name + "' work is not registered.");
          res.push(work);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}



      return res;} }, { key: "isAutomatorWork", value: 





    function isAutomatorWork() {
      return false;} }, { key: "isTesterWork", value: 





    function isTesterWork() {
      return false;} }, { key: "isMacroWork", value: 





    function isMacroWork() {
      return true;} }]);return MacroWork;})(_Work3["default"]);exports["default"] = MacroWork;module.exports = exports["default"];
