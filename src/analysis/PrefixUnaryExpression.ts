import { SyntaxNode } from "./SyntaxNode"

export class PrefixUnaryExpression extends SyntaxNode {
  constructor(public operator: number, public operand: SyntaxNode, public override pos: number) {
    super(224, pos)
  }

  override get text(): string {
    let text = ""
    switch (this.operator) {
      case 41:
        text += "-"
        break
      default:
        throw new Error("Method not implemented.")
    }
    text += this.operand.text
    return text
  }

  override get location(): string {
    let location = ""
    switch (this.operator) {
      case 41:
        location += "-"
        break
      default:
        throw new Error("Method not implemented.")
    }
    location += this.operand.location
    return location
  }
}
