export default class Call {
  constructor(title, task, params) {
    Object.defineProperty(this, "title", {value: title, enumerable: true});
    Object.defineProperty(this, "task", {value: task, enumerable: true});
    Object.defineProperty(this, "params", {value: params, enumerable: true});
  }

  get description() {
    return this.task.__task__.description;
  }

  isSimple() {
    return this.task.__task__.isSimple();
  }

  isMacro() {
    return this.task.__task__.isMacro();
  }

  isWorkflow() {
    return this.task.__task__.isWorkflow();
  }
}
