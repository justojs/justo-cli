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

    if (testOpts.src) testOpts.source = testOpts.src;
    if (typeof(testOpts.source) == "string") testOpts.source = [testOpts.source];

    //(2) super
    super(regOpts);

    //(3) this
    Object.defineProperty(this, "source", {value: testOpts.source || [], enumerable: true});
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
