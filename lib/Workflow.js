/**
 * A workflow.
 *
 * @param title:string  The workflow title.
 * @param fn:function   The function.
 */
export default class Workflow {
  /**
   * Constructor.
   */
  constructor(title, fn) {
    Object.defineProperty(this, "title", {value: title, enumerable: true});
    Object.defineProperty(this, "fn", {value: fn, enumerable: true});
  }
}
