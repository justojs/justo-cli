/**
 * A register.
 *
 * @readonly title:string       The title.
 * @readonly description:object The description.
 * @readonly task:Task          The task.
 */
export default class Register {
  /**
   * Constructor.
   *
   * @param(attr) title
   * @param opts:object The options.
   * @param(attr) task
   */
  constructor(title, opts, task) {
    Object.defineProperty(this, "title", {value: title, enumerable: true});
    Object.defineProperty(this, "description", {value: opts.desc || opts.description || task.description || "", enumerable: true});
    Object.defineProperty(this, "task", {value: task, enumerable: true});
  }
}
