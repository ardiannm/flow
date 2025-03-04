import { SyntaxNode } from "./SyntaxNode"

export class SlashToken extends SyntaxNode {
  constructor() {
    super(44)
  }

  override get text(): string {
    return "/"
  }

  override get location(): string {
    return this.text
  }
}
