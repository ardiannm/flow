import { SyntaxNode } from "./SyntaxNode"

export class VariableDeclaration extends SyntaxNode {
  constructor(public name: SyntaxNode, public initializer: SyntaxNode) {
    super(260)
  }

  override get text(): string {
    return this.name.text + " = " + this.initializer.text
  }

  override get textByReference(): string {
    return this.name.textByReference + " = " + this.initializer.textByReference
  }
}
