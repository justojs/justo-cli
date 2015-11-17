//imports
import Register from "./Register";

/**
 * The registered tasks.
 */
export default class Registers {
  /**
   * Add a register.
   *
   * @param title:string  The title.
   * @param opts:object   The options.
   * @param task:Task The task to register.
   */
  add(title, opts, task) {
    this[title] = new Register(title, opts, task);
  }

  /**
   * Check whether a register exists.
   *
   * @param title:string  The title to check.
   * @return boolean
   */
  exists(title) {
    return !!this[title];
  }
}
