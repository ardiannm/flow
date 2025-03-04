import { SyntaxNode } from "./SyntaxNode"

export class FirstAssignment extends SyntaxNode {
  constructor(public override pos: number) {
    super(64, pos)
  }

  override get text(): string {
    return "="
  }

  override get location(): string {
    return this.text
  }
}
