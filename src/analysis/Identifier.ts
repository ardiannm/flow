import { SyntaxNode } from "./SyntaxNode"

export class Identifier extends SyntaxNode {
  constructor(public escapedText: string) {
    super(80)
  }
  override get text(): string {
    return this.escapedText
  }
}
