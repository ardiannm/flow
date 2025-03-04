import { SyntaxNode } from "./SyntaxNode"

export class ExpressionStatement extends SyntaxNode {
  constructor(public expression: SyntaxNode, public override pos: number) {
    super(244, pos)
  }

  override get text(): string {
    return this.expression.text
  }

  override get location(): string {
    return this.expression.location
  }
}
