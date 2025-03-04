import { SyntaxNode } from "./SyntaxNode"

export class GreaterThanEqualsToken extends SyntaxNode {
  constructor() {
    super(34)
  }
  override get text(): string {
    return ">="
  }

  override get location(): string {
    return this.text
  }
}

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
