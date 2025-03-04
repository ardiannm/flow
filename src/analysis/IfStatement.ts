import { Block } from "./Block"
import { SyntaxNode } from "./SyntaxNode"

export class IfStatement extends SyntaxNode {
  constructor(public expression: SyntaxNode, public thenStatement: Block, public elseStatement: Block | undefined) {
    super(245)
  }

  override get text(): string {
    return "if " + this.expression.text + " then " + (this.thenStatement.text || "") + " else " + (this.elseStatement?.text || "") + ")"
  }

  override get location(): string {
    return "if " + this.expression.location + " then " + (this.thenStatement.location || "") + " else " + (this.elseStatement?.location || "") + ")"
  }
}
