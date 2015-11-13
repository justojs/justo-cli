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
  constructor(opts, fn) {
    //(1) arguments
    if (typeof(opts) == "string") opts = {title: opts};

    Object.defineProperty(this, "title", {value: opts.title, enumerable: true});
    Object.defineProperty(this, "description", {value: opts.desc || opts.description, enumerable: true});
    Object.defineProperty(this, "fn", {value: fn, enumerable: true});
  }
}
