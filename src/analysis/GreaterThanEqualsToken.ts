import { SyntaxNode } from "./SyntaxNode"

export class GreaterThanEqualsToken extends SyntaxNode {
  constructor(public override pos: number) {
    super(34, pos)
  }

  override get text(): string {
    return ">="
  }

  override get location(): string {
    return this.text
  }
}
