import { SyntaxNode } from "./SyntaxNode"

export class PlusToken extends SyntaxNode {
  constructor() {
    super(40)
  }

  override get text(): string {
    return "+"
  }

  override get location(): string {
    return this.text
  }
}
