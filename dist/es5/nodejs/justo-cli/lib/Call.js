"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 





Call = (function () {



  function Call(name, params) {_classCallCheck(this, Call);
    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "params", { value: params, enumerable: true });}_createClass(Call, null, [{ key: "parse", value: 








    function parse(call, opts) {
      var name, params;


      if (call.indexOf(":") < 0) {
        name = call;
        params = [];} else 
      {
        name = call.substr(0, call.indexOf(":"));
        params = call.split(":").slice(1);

        if (opts.parse) {
          for (var i = 0; i < params.length; ++i) {
            var param = params[i];

            if (isNaN(Number(param))) {
              if (/^['"].*['"]$/.test(param)) param = param.replace(/['"]/, "");} else 
            {
              param = Number(param);}


            params[i] = param;}}}





      return new Call(name, params);} }]);return Call;})();exports["default"] = Call;module.exports = exports["default"];
