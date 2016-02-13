"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var ParamParser = function () {function ParamParser() {_classCallCheck(this, ParamParser);}_createClass(ParamParser, null, [{ key: "parse", value: function parse(









    line, opts) {
      var name, value;


      if (line.indexOf(":") < 0) {
        name = line;
        value = [];} else 
      {
        name = line.substr(0, line.indexOf(":"));
        value = line.split(":").slice(1);

        if (opts.parse) {
          for (var i = 0; i < value.length; ++i) {
            var item = value[i];

            if (isNaN(Number(item))) {
              if (/^['"].*['"]$/.test(item)) item = item.replace(/['"]/, "");} else 
            {
              item = Number(item);}


            value[i] = item;}}}





      return [name, value];} }]);return ParamParser;}();exports.default = ParamParser;
