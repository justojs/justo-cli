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
    //(1) arguments
    testOpts = Object.assign({}, testOpts);

    if (testOpts.require) {
      if (typeof(testOpts.require) == "string") testOpts.require = [testOpts.require];
    } else {
      testOpts.require = [];
    }

    //(2) super
    super(regOpts);

    //(3) this
    Object.defineProperty(this, "source", {value: testOpts.source || testOpts.src || [], enumerable: true});
    Object.defineProperty(this, "require", {value: testOpts.require, enumerable: true});
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
  isAutomatorWork() {
    return false;
  }

  /**
   * @override
   */
  isTesterWork() {
    return true;
  }

  /**
   * @override
   */
  isMacroWork() {
    return false;
  }
}
