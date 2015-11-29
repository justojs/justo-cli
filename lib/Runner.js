//imports
import Loader from "./Loader";

/**
 * The CLI runner.
 */
export default class Runner {
  /**
   * Run the calls.
   *
   * @param calls:Calls The calls specified by the user.
   * @param works:Works The registered works.
   */
  static run(calls, works) {
    const justo = Loader.importJusto();

    //(1) check works
    for (let call of calls) {
      if (!works.exists(call.name)) throw new Error(`No '${call.name}' work has been registered.`);
    }

    //(2) run
    for (let call of calls) {
      let work = works[call.name];
      justo.run(work, call.params);
    }
  }
}
