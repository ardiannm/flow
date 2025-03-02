import { SyntaxNode } from "./SyntaxNode"

export class IfStatement extends SyntaxNode {
  constructor(public expression: SyntaxNode, public thenStatement: SyntaxNode, public elseStatement?: SyntaxNode) {
    super(245)
  }
  override get text(): string {
    return "if " + this.expression.text + " then " + (this.thenStatement.text || "") + " else " + (this.elseStatement?.text || "") + ")"
  }

  override get textByReference(): string {
    return "if " + this.expression.textByReference + " then " + (this.thenStatement.textByReference || "") + " else " + (this.elseStatement?.textByReference || "") + ")"
  }
}
