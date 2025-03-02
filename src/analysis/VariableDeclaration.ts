import { SyntaxNode } from "./SyntaxNode"

export class VariableDeclaration extends SyntaxNode {
  constructor(public name: SyntaxNode, public initializer: SyntaxNode) {
    super(260)
  }
  override get text(): string {
    throw new Error("Method not implemented.")
  }
}
