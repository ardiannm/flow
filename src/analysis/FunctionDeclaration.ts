import { SyntaxNode } from "./SyntaxNode"

export class FunctionDeclaration extends SyntaxNode {
  constructor(public name: SyntaxNode, public body: SyntaxNode) {
    super(262)
  }

  override get text(): string {
    return "\n".repeat(2) + "// " + this.name.text + "\n" + this.body.text
  }

  override get textByReference() {
    return "\n".repeat(2) + "// " + this.name.textByReference + "\n" + this.body.textByReference
  }
}
