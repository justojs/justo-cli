//imports
import Register from "./Register";

/**
 * The registered tasks.
 */
export default class Registers {
  /**
   * Add a register.
   *
   * @param opts:object   The options.
   * @param task:Task The task to register.
   */
  add(opts, task) {
    this[opts.name] = new Register(opts, task);
  }

  /**
   * Check whether a register exists.
   *
   * @param name:string The name to check.
   * @return boolean
   */
  exists(name) {
    return !!this[name];
  }
}
