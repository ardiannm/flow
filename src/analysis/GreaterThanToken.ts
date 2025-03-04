import { SyntaxNode } from "./SyntaxNode"

export class GreaterThanToken extends SyntaxNode {
  constructor(public override pos: number) {
    super(32, pos)
  }

  override get text(): string {
    return ">"
  }

  override get location(): string {
    return this.text
  }
}
