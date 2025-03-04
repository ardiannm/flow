import { SyntaxNode } from "./SyntaxNode"

export class AsteriskToken extends SyntaxNode {
  constructor() {
    super(42)
  }

  override get text(): string {
    return "*"
  }

  override get location() {
    return this.text
  }
}
