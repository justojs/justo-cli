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
    var name, params;

    //(1) parse
    if (call.indexOf(":") < 0) {
      name = call;
      params = [];
    } else {
      name = call.substr(0, call.indexOf(":"));
      params = call.split(":").slice(1);

      if (opts.parse) {
        for (let i = 0; i < params.length; ++i) {
          let param = params[i];

          if (isNaN(Number(param))) {
            if (/^['"].*['"]$/.test(param)) param = param.replace(/['"]/, "");
          } else {
            param = Number(param);
          }

          params[i] = param;
        }
      }
    }

    //(2) return
    return new Call(name, params);
  }
}
