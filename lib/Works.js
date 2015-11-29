//imports
import AutomatorWork from "./AutomatorWork";
import TesterWork from "./TesterWork";

/**
 * A collection of works.
 */
export default class Works {
  /**
   * Add a work.
   *
   * @param work:Work The work to add.
   */
  add(work) {
    this[work.name] = work;
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
