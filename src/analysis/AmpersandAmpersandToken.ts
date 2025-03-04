import { SyntaxNode } from "./SyntaxNode"

export class AmpersandAmpersandToken extends SyntaxNode {
  constructor() {
    super(56)
  }

  override get text(): string {
    return "&&"
  }

  override get location(): string {
    return this.text
  }
}
