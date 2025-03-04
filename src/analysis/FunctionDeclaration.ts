import { Identifier } from "./Identifier"
import { SyntaxNode } from "./SyntaxNode"

export class FunctionDeclaration extends SyntaxNode {
  constructor(public name: Identifier, public body: SyntaxNode, public override pos: number) {
    super(262, pos)
  }

  override get text(): string {
    return this.name.text
  }

  override get location() {
    return this.name.location
  }
}
