"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _ParamParser = require("./ParamParser");var _ParamParser2 = _interopRequireDefault(_ParamParser);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 








Call = function () {



  function Call(name, params) {_classCallCheck(this, Call);
    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "params", { value: params, enumerable: true });}_createClass(Call, null, [{ key: "parse", value: function parse(








    call, opts) {
      return new (Function.prototype.bind.apply(Call, [null].concat(_toConsumableArray(_ParamParser2.default.parse(call, opts)))))();} }]);return Call;}();exports.default = Call;
