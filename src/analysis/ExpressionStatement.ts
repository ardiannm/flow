import { SyntaxNode } from "./SyntaxNode"

export class ExpressionStatement extends SyntaxNode {
  constructor(public expression: SyntaxNode) {
    super(244)
  }
  override get text(): string {
    return this.expression.text
  }

  override get textByReference(): string {
    return this.expression.textByReference
  }
}
