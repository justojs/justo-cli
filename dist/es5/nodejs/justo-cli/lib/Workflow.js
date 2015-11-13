"use strict";Object.defineProperty(exports, "__esModule", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 





Workflow = 



function Workflow(opts, fn) {_classCallCheck(this, Workflow);

  if (typeof opts == "string") opts = { title: opts };

  Object.defineProperty(this, "title", { value: opts.title, enumerable: true });
  Object.defineProperty(this, "description", { value: opts.desc || opts.description, enumerable: true });
  Object.defineProperty(this, "fn", { value: fn, enumerable: true });};exports["default"] = Workflow;module.exports = exports["default"];
