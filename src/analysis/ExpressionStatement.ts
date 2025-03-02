import { SyntaxNode } from "./SyntaxNode"

export class ExpressionStatement extends SyntaxNode {
  constructor(public expression: SyntaxNode) {
    super(244)
  }
  override get text(): string {
    return this.expression.text
  }
}
