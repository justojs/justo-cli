"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _os = require("os");var _os2 = _interopRequireDefault(_os);
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);
var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);
var _JustoJson = require("./JustoJson");var _JustoJson2 = _interopRequireDefault(_JustoJson);
var _ParamParser = require("./ParamParser");var _ParamParser2 = _interopRequireDefault(_ParamParser);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var




Cli = function () {function Cli() {_classCallCheck(this, Cli);}_createClass(Cli, null, [{ key: "generate", value: function generate(








    justojson, name, params, opts) {
      var cmd, answers, dst, help, pkg, pkgName, config;


      answers = {};var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

        for (var _iterator = params[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var p = _step.value;
          if (/^.+:.*$/.test(p)) {var _ParamParser$parse =
            _ParamParser2.default.parse(p, opts),_ParamParser$parse2 = _slicedToArray(_ParamParser$parse, 2),_name3 = _ParamParser$parse2[0],value = _ParamParser$parse2[1];
            answers[_name3] = value.length == 1 ? value[0] : value;
          } else {
            if (cmd) cmd += " " + p;else
            cmd = p;
          }
        }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}

      if (/^help ?/.test(cmd)) {
        help = true;
        cmd = cmd.replace(/^help ?/, "");
      } else if (/^dst *$/.test(cmd)) {
        dst = true;
      }


      try {
        pkgName = "justo-generator-" + name;
        pkg = require(pkgName);
      } catch (e) {
        if (/^Cannot find module/.test(e.message)) {
          throw new Error("The generator is not installed. Please, install it using 'npm install -g " + pkgName + "'.");
        } else {
          throw e;
        }
      }


      config = _JustoJson2.default.read(justojson).generator[pkgName];
      if (!config) config = {};
      if (!config.dst) config.dst = process.cwd();


      if (help) showHelp();else
      if (dst) showDst(config);else
      run(config);


      function showDst() {
        console.log(config.dst);
      }

      function showHelp() {
        if (cmd) showGeneratorHelp(pkg[cmd]);else
        if (pkg instanceof Function) showGeneratorHelp(pkg);else
        showPackageHelp(pkg);
      }

      function showGeneratorHelp(Class) {
        var table = require("text-table");
        var gen, help;


        gen = new Class({}, {});
        help = gen.help;


        if (help.desc) {
          console.log("Description:");
          console.log(" ", help.desc);
        }


        if (help.params) {
          var names = Object.keys(help.params);

          if (names.length > 0) {
            var tbl = [["  Name", "Type", "Description", "Options"]];var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {

              for (var _iterator2 = names.sort()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var _name = _step2.value;
                var param = void 0,type = void 0,title = void 0,_opts = void 0;

                param = help.params[_name];

                if (typeof param == "string") {
                  type = "String";
                  title = param;
                  _opts = "";
                } else {
                  type = param.type || "String";
                  title = param.title || "";
                  if ("choices" in param) _opts = param.choices ? param.choices.join(", ") : "";else
                  if ("options" in param) _opts = param.options ? param.options.join(", ") : "";else
                  _opts = "";
                }

                tbl.push(["  " + _name, type, title, _opts]);
              }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}

            console.log("\nParameters:");
            console.log(table(tbl));
          }
        }
      }

      function showPackageHelp(pkg) {
        var table = require("text-table");


        if (pkg.default) showGeneratorHelp(pkg.default);


        var names = Object.keys(pkg);

        if (names.length > 1) {
          var tbl = [["  Name", "Description"]];var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {

            for (var _iterator3 = names.sort()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var _name2 = _step3.value;
              if (_name2 != "default") {
                var gen = new pkg[_name2]({}, {});
                tbl.push(["  " + _name2, gen.help.desc || ""]);
              }
            }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}

          console.log("\nCommands (use 'help command' for more info):");
          console.log(table(tbl));
        }
      }

      function run(config) {
        var Class, gen;


        if (cmd) Class = pkg[cmd];else
        Class = pkg instanceof Function ? pkg : pkg.default;


        gen = new Class({ mute: opts.mute }, answers);
        if (!gen.src) gen.src = _path2.default.join(_path2.default.dirname(require.resolve(pkgName)), "template");
        if (config.dst) gen.dst = config.dst;
        if (!gen.dst) gen.dst = process.cwd();


        gen.run();
      }
    } }, { key: "listCatalogedTasks", value: function listCatalogedTasks(







    pth, opts) {
      var Loader = require(_path2.default.join(process.cwd(), "node_modules/justo-loader")).Loader;
      var table = require("text-table");
      var justo, config, tbl;


      config = _JustoJson2.default.read(pth, opts);
      justo = Loader.loadJusto();
      justo.initialize(config);
      Loader.load(config.runner.main);


      tbl = [];var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {
        for (var _iterator4 = Object.keys(justo.runner.catalog.tasks).sort()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var name = _step4.value;
          var task = justo.runner.catalog.get(name).__task__;

          tbl.push([
          task.name,
          task.desc || ""]);

        }} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}

      if (tbl.length > 0) tbl = [["Name", "Description"]].concat(tbl);
      console.log(table(tbl));
    } }, { key: "runCatalogedTasks", value: function runCatalogedTasks(










    justojson, calls, opts) {
      var Loader = require(_path2.default.join(process.cwd(), "node_modules/justo-loader")).Loader;
      var Calls = require("./Calls").default;
      var justo;


      if (!calls || calls.length === 0) calls = ["default"];
      if (!opts) opts = { only: false };


      justojson = _JustoJson2.default.read(justojson, opts);
      if (opts.hasOwnProperty("only")) justojson.runner.only = opts.only;
      justo = Loader.loadJusto();
      justo.initialize(justojson);
      Loader.load(justojson.runner.main);


      justo.runner.runCatalogedTasks(Calls.parse(calls, opts));


      return { state: justo.runner.state };
    } }, { key: "runInstalledModule", value: function runInstalledModule(
























































    name, calls, opts) {
      var Calls = require("./Calls").default;
      var Loader, justo, justojson;


      process.chdir(_path2.default.dirname(require.resolve(name)));


      if (!calls || calls.length === 0) calls = ["default"];


      Loader = require(_path2.default.join(process.cwd(), "node_modules/justo-loader")).Loader;
      justojson = _JustoJson2.default.read("Justo.json", opts);
      justo = Loader.loadJusto();
      justo.initialize(justojson);


      require(name);


      justo.runner.runCatalogedTasks(Calls.parse(calls, { only: opts.only }));


      return { state: justo.runner.state };
    } }]);return Cli;}();exports.default = Cli;
