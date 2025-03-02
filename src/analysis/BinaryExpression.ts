import { SyntaxNode } from "./SyntaxNode"

export class BinaryExpression extends SyntaxNode {
  constructor(public left: SyntaxNode, public operatorToken: SyntaxNode, public right: SyntaxNode) {
    super(226)
  }
  override get text(): string {
    return this.left.text + " " + this.operatorToken.text + " " + this.right.text
  }
}
