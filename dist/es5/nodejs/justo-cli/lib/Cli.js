"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _os = require("os");var _os2 = _interopRequireDefault(_os);var _path = require("path");var _path2 = _interopRequireDefault(_path);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);var _JustoJson = require("./JustoJson");var _JustoJson2 = _interopRequireDefault(_JustoJson);var _ParamParser = require("./ParamParser");var _ParamParser2 = _interopRequireDefault(_ParamParser);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 









Cli = function () {function Cli() {_classCallCheck(this, Cli);}_createClass(Cli, null, [{ key: "generate", value: function generate(







    name, params, opts) {
      var gen, cmd, answers;


      answers = {};var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

        for (var _iterator = params[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var p = _step.value;
          if (/^.+:.*$/.test(p)) {var _ParamParser$parse = 
            _ParamParser2.default.parse(p, opts);var _ParamParser$parse2 = _slicedToArray(_ParamParser$parse, 2);var _name = _ParamParser$parse2[0];var value = _ParamParser$parse2[1];
            answers[_name] = value;} else 
          {
            if (cmd) cmd += " " + p;else 
            cmd = p;}}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}




      try {
        var Class = undefined, pkg = undefined, pkgName = undefined;


        pkgName = "justo-generator-" + name;


        pkg = require(pkgName);

        if (cmd) Class = pkg[cmd];else 
        Class = pkg instanceof Function ? pkg : pkg.default;

        gen = new Class({}, answers);
        if (!gen.src) gen.src = _path2.default.join(_path2.default.dirname(require.resolve(pkgName)), "template");} 
      catch (e) {
        if (/^Cannot find module/.test(e.message)) {
          throw new Error("The generator is not installed. Please, install it using 'npm install -g justo-generator-" + name + "'.");} else 
        {
          throw e;}}




      gen.run();} }, { key: "listCatalogedTasks", value: function listCatalogedTasks(







    path) {
      var Loader = require("justo-loader").Loader;
      var table = require("text-table");
      var justo, config, tbl;


      config = _JustoJson2.default.read(path);
      justo = Loader.loadJusto();
      justo.initialize(config);
      Loader.load(config.runner.main);


      tbl = [];var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
        for (var _iterator2 = Object.keys(justo.runner.catalog.tasks).sort()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var name = _step2.value;
          var task = justo.runner.catalog.get(name).__task__;

          tbl.push([
          task.name, 
          task.desc || ""]);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}



      if (tbl.length > 0) tbl = [["Name", "Description"]].concat(tbl);
      console.log(table(tbl));} }, { key: "runCatalogedTasks", value: function runCatalogedTasks(









    justojson, calls, opts) {
      var Loader = require("justo-loader").Loader;
      var Calls = require("./Calls").default;
      var justo;


      if (!calls || calls.length === 0) calls = ["default"];
      if (!opts) opts = { parse: false, only: false };


      justojson = _JustoJson2.default.read(justojson);
      if (opts.hasOwnProperty("only")) justojson.runner.only = opts.only;
      justo = Loader.loadJusto();
      justo.initialize(justojson);
      Loader.load(justojson.runner.main);


      justo.runner.runCatalogedTasks(Calls.parse(calls, opts));} }]);return Cli;}();exports.default = Cli;
