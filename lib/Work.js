/**
 * A work registered by the user.
 *
 * @abstract
 * @readonly name:string        The title.
 * @readonly description:string The description.
 */
export default class Work {
  /**
   * Constructor.
   *
   * @param opts:object The options.
   */
  constructor(opts) {
    Object.defineProperty(this, "name", {value: opts.name, enumerable: true});
    Object.defineProperty(this, "description", {value: opts.desc || opts.description || "", enumerable: true});
  }

  /**
   * @alias description
   */
  get desc() {
    return this.description;
  }

  /**
   * Is an automator work?
   *
   * @abstract
   * @return boolean
   */
  isAutomatorWork() {
    throw new Error("Abstract method.");
  }

  /**
   * Is a tester work?
   *
   * @abstract
   * @return boolean
   */
  isTesterWork() {
    throw new Error("Abstract method.");
  }

  /**
   * Is a macro work?
   *
   * @abstract
   * @return boolean
   */
  isMacroWork() {
    throw new Error("Abstract method.");
  }
}
