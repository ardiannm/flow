export class EmitOutput {
  constructor(public variable: string, public value: string, public variableLocation: string, public valueLocation: string, public comment: string) {
    if (this.valueLocation.length) {
      this.valueLocation = "=" + this.valueLocation
    }
  }
}
