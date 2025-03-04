import { SyntaxNode } from "./SyntaxNode"

export class ParenthesizedExpression extends SyntaxNode {
  constructor(public expression: SyntaxNode, public override pos: number) {
    super(217, pos)
  }
  
  override get text(): string {
    return "(" + this.expression.text + ")"
  }
  override get location(): string {
    return "(" + this.expression.location + ")"
  }
}
