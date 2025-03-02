import { SyntaxNode } from "./SyntaxNode"

export class IfStatement extends SyntaxNode {
  constructor(public expression: SyntaxNode, public thenStatement: SyntaxNode) {
    super(245)
  }
  override get text(): string {
    throw new Error("Method not implemented.")
  }
}
