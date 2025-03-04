import { SyntaxNode } from "./SyntaxNode"

export class FirstBinaryOperator extends SyntaxNode {
  constructor(public override pos: number) {
    super(30, pos)
  }

  override get text(): string {
    return "<"
  }

  override get location(): string {
    return this.text
  }
}
