import { AmpersandAmpersandToken } from "./GreaterThanEqualsToken"
import { SyntaxNode } from "./SyntaxNode"

export class BinaryExpression extends SyntaxNode {
  constructor(public left: SyntaxNode, public operatorToken: SyntaxNode, public right: SyntaxNode) {
    super(226)
  }
  override get text(): string {
    if (this.operatorToken instanceof AmpersandAmpersandToken) {
      return "AND(" + this.left.text + "," + this.right.text + ")"
    }
    return this.left.text + this.operatorToken.text + this.right.text
  }

  override get location() {
    if (this.operatorToken instanceof AmpersandAmpersandToken) {
      return "AND(" + this.left.location + "," + this.right.location + ")"
    }
    return this.left.location + this.operatorToken.location + this.right.location
  }
}
