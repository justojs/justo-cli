//imports
import Work from "./Work";

/**
 * An automator work registered by the user.
 *
 * @readonly task:Task  The task.
 */
export default class AutomatorWork extends Work {
  /**
   * Constructor.
   *
   * @param opts:object The register options.
   * @param(attr) task
   */
  constructor(opts, task) {
    super(opts);
    Object.defineProperty(this, "task", {value: task, enumerable: true});
  }

  /**
   * @override
   */
  isTesterWork() {
    return false;
  }
}
