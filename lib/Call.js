//imports
import ParamParser from "./ParamParser";

/**
 * A call of register work.
 *
 * @readonly name:string      The work name to call.
 * @readonly params:object[]  The parameters to pass.
 */
export default class Call {
  /**
   * Constructor.
   */
  constructor(name, params) {
    Object.defineProperty(this, "name", {value: name, enumerable: true});
    Object.defineProperty(this, "params", {value: params, enumerable: true});
  }

  /**
   * Parse a call.
   *
   * @param call:string The call.
   * @param opts:object The parse options: parse.
   */
  static parse(call, opts) {
    return new Call(...ParamParser.parse(call, opts));
  }
}
