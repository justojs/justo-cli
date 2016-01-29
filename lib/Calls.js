//imports
import Call from "./Call";

/**
 * An array of calls.
 */
export default class Calls extends Array {
  /**
   * Constructor.
   */
  constructor() {
    super();
    Object.defineProperty(this, "add", {value: (call) => { this.push(call); }});
  }

  /**
   * Parses the calls specified by the user.
   *
   * @param cc:string[] The calls to parse.
   * @param opts:object The parse options.
   */
  static parse(cc, opts) {
    var calls = new Calls();
    for (let c of cc) calls.add(Call.parse(c, opts));
    return calls;
  }
}
