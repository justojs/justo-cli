export default class ParamParser {
  /**
   * Parse a call.
   * Returns [name, value].
   *
   * @param line:string The call.
   * @param opts:object The parse options: parse.
   *
   * @return object[]
   */
  static parse(line, opts) {
    var name, value;

    //(1) parse
    if (line.indexOf(":") < 0) {
      name = line;
      value = [];
    } else {
      name = line.substr(0, line.indexOf(":"));
      value = line.split(":").slice(1);

      if (opts.parse) {
        for (let i = 0; i < value.length; ++i) {
          let item = value[i];

          if (isNaN(Number(item))) {
            if (/^['"].*['"]$/.test(item)) item = item.replace(/['"]/, "");
          } else {
            item = Number(item);
          }

          value[i] = item;
        }
      }
    }

    //(2) return
    return [name, value];
  }
}
