import { SyntaxNode } from "./SyntaxNode"

export class MinusToken extends SyntaxNode {
  constructor(public override pos: number) {
    super(41, pos)
  }

  override get text(): string {
    return "-"
  }

  override get location() {
    return this.text
  }
}
