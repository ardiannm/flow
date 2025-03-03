import { SyntaxNode } from "./SyntaxNode"

export class FunctionDeclaration extends SyntaxNode {
  constructor(public name: SyntaxNode, public body: SyntaxNode) {
    super(262)
  }

  override get text(): string {
    return this.name.text
  }

  override get location() {
    return this.name.location
  }
}
