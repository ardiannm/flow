import { SyntaxNode } from "./SyntaxNode"

export class VariableDeclaration extends SyntaxNode {
  constructor(public name: SyntaxNode, public initializer: SyntaxNode) {
    super(260)
  }

  override get text(): string {
    return this.name.text + " = " + this.initializer.text
  }

  override get reference(): string {
    return this.name.reference + " = " + this.initializer.reference
  }
}
