/**
 * A register.
 *
 * @readonly name:string        The title.
 * @readonly description:object The description.
 * @readonly task:Task          The task.
 */
export default class Register {
  /**
   * Constructor.
   *
   * @param opts:object The options.
   * @param(attr) task
   */
  constructor(opts, task) {
    Object.defineProperty(this, "name", {value: opts.name, enumerable: true});
    Object.defineProperty(this, "description", {value: opts.desc || opts.description || task.description || "", enumerable: true});
    Object.defineProperty(this, "task", {value: task, enumerable: true});
  }
}
