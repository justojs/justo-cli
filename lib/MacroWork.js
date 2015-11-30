//imports
import Work from "./Work";

/**
 * An array of works.
 */
export default class MacroWork extends Work {
  /**
   * Constructor.
   *
   * @param opts:object     The work options.
   * @param calls:string[]  The calls.
   */
  constructor(opts, calls) {
    super(opts);
    Object.defineProperty(this, "calls", {value: calls, enumerable: true});
  }

  /**
   * Returns the works associated to the calls.
   *
   * @param works:Works The registered works.
   * @return Work[]
   */
  getWorks(works) {
    var res;

    //(1) get
    res = [];
    for (let call of this.calls) {
      let work = works[call.name];
      if (!work) throw new Error(`The '${call.name}' work is not registered.`);
      res.push(work);
    }

    //(2) return
    return res;
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
    return false;
  }

  /**
   * @override
   */
  isMacroWork() {
    return true;
  }
}
