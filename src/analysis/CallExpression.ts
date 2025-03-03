import { Identifier } from "./Identifier"
import { SyntaxNode } from "./SyntaxNode"

export class CallExpression extends SyntaxNode {
  constructor(public expression: Identifier) {
    super(213)
  }
  override get text(): string {
    return this.expression.text
  }
  override get location(): string {
    return this.expression.location
  }
}
