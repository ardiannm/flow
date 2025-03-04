import { SyntaxNode } from "./SyntaxNode"

export class EqualsEqualsEqualsToken extends SyntaxNode {
  constructor() {
    super(37)
  }

  override get text(): string {
    return "="
  }

  override get location() {
    return this.text
  }
}
