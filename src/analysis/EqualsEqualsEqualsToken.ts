import { SyntaxNode } from "./SyntaxNode"

export class EqualsEqualsEqualsToken extends SyntaxNode {
  constructor(public override pos: number) {
    super(37, pos)
  }

  override get text(): string {
    return "="
  }

  override get location() {
    return this.text
  }
}
