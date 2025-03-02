import { SyntaxNode } from "./SyntaxNode"

export class FunctionDeclaration extends SyntaxNode {
  constructor(public name: SyntaxNode, public body: SyntaxNode) {
    super(262)
  }
  override get text(): string {
    throw new Error("Method not implemented.")
  }
}
