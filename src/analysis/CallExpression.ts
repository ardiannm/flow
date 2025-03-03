import { Identifier } from "./Identifier"
import { SyntaxNode } from "./SyntaxNode"

export class CallExpression extends SyntaxNode {
  constructor(public expression: Identifier) {
    super(213)
  }
  override get text(): string {
    throw new Error("Method not implemented.")
  }
  override get location(): string {
    throw new Error("Method not implemented.")
  }
}
