import { SyntaxNode } from "./SyntaxNode"

export class FirstLiteralToken extends SyntaxNode {
  constructor(public internalText: string) {
    super(9)
  }
  override get text(): string {
    return this.internalText
  }
}
