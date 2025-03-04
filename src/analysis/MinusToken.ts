import { SyntaxNode } from "./SyntaxNode"

export class MinusToken extends SyntaxNode {
  constructor() {
    super(41)
  }

  override get text(): string {
    return "-"
  }

  override get location() {
    return this.text
  }
}
