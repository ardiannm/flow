import { SyntaxNode } from "./SyntaxNode"

export class GreaterThanToken extends SyntaxNode {
  constructor() {
    super(32)
  }
  override get text(): string {
    return ">"
  }

  override get location(): string {
    return this.text
  }
}
