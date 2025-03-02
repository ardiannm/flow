import { SyntaxNode } from "./SyntaxNode"

export class FirstBinaryOperator extends SyntaxNode {
  constructor() {
    super(30)
  }
  override get text(): string {
    return "<"
  }
}
