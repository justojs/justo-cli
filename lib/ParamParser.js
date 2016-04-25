export default class ParamParser {
  /**
   * Parse a call.
   * Returns [name, value].
   *
   * @param line:string The call.
   * @param opts:object The parse options. Right now, none.
   *
   * @return object[]
   */
  static parse(line, opts) {
    var name, value;

    //(1) arguments
    if (!opts) opts = {};

    //(2) parse
    if (line.indexOf(":") < 0) {
      name = line;
      value = [];
    } else {
      name = line.substr(0, line.indexOf(":"));
      value = line.split(":").slice(1);
    }

    //(2) return
    return [name, value];
  }
}
