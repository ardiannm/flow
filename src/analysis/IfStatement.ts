import { SyntaxNode } from "./SyntaxNode"

export class IfStatement extends SyntaxNode {
  constructor(public expression: SyntaxNode, public thenStatement: SyntaxNode) {
    super(245)
  }
  override get text(): string {
    return "=IF(" + this.expression.text + " ,, " + this.thenStatement.text + ")"
  }
  
  override get textByReference(): string {
    return "=IF(" + this.expression.textByReference + " ,, " + this.thenStatement.text + ")"
  }
}
