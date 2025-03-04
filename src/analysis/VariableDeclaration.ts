import { SyntaxNode } from "./SyntaxNode"

export class VariableDeclaration extends SyntaxNode {
  constructor(public name: SyntaxNode, public initializer: SyntaxNode) {
    super(260)
  }

  override get text(): string {
    return this.name.text + " = " + this.initializer.text
  }

  override get location(): string {
    return this.name.location + " = " + this.initializer.location
  }
}
