import { AmpersandAmpersandToken } from "./AmpersandAmpersandToken"
import { SyntaxNode } from "./SyntaxNode"

export class BinaryExpression extends SyntaxNode {
  constructor(public left: SyntaxNode, public operatorToken: SyntaxNode, public right: SyntaxNode, public override pos: number) {
    super(226, pos)
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
