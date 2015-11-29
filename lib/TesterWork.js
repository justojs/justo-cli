//imports
import Work from "./Work";

/**
 * A tester register.
 *
 * @readonly options:object The options.
 */
export default class TesterWork extends Work {
  /**
   * Constructor.
   *
   * @param regOpts:object  The register options.
   * @param testOpts:object The options.
   */
  constructor(regOpts, testOpts) {
    super(regOpts);
    Object.defineProperty(this, "source", {value: testOpts.source || testOpts.src || [], enumerable: true});
    Object.defineProperty(this, "require", {value: testOpts.require || [], enumerable: true});
    Object.defineProperty(this, "timeout", {value: testOpts.timeout, enumerable: true});
  }

  /**
   * @alias source
   */
  get src() {
    return this.source;
  }

  /**
   * @override
   */
  isTesterWork() {
    return true;
  }
}
