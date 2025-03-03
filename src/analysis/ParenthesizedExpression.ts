import { SyntaxNode } from "./SyntaxNode"

export class ParenthesizedExpression extends SyntaxNode {
  constructor(public expression: SyntaxNode) {
    super(217)
  }
  override get text(): string {
    return "(" + this.expression.text + ")"
  }
  override get location(): string {
    return "(" + this.expression.location + ")"
  }
}
