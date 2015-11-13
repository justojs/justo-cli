export default class Call {
  constructor(workflow, params) {
    Object.defineProperty(this, "workflow", {value: workflow, enumerable: true});
    Object.defineProperty(this, "params", {value: params, enumerable: true});
  }

  get fn() {
    return this.workflow.fn;
  }

  get title() {
    return this.workflow.title;
  }
}
