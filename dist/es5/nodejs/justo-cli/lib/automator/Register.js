"use strict";Object.defineProperty(exports, "__esModule", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 






Register = 







function Register(title, opts, task) {_classCallCheck(this, Register);
  Object.defineProperty(this, "title", { value: title, enumerable: true });
  Object.defineProperty(this, "description", { value: opts.desc || opts.description || task.description || "", enumerable: true });
  Object.defineProperty(this, "task", { value: task, enumerable: true });};exports["default"] = Register;module.exports = exports["default"];
