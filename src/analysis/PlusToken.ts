import { SyntaxNode } from "./SyntaxNode"

export class PlusToken extends SyntaxNode {
  constructor(public override pos: number) {
    super(40, pos)
  }

  override get text(): string {
    return "+"
  }

  override get location(): string {
    return this.text
  }
}
