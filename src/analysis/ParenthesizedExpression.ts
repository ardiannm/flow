import { AsteriskToken } from "./AsteriskToken"
import { BinaryExpression } from "./BinaryExpression"
import { SlashToken } from "./SlashToken"
import { SyntaxNode } from "./SyntaxNode"

export class ParenthesizedExpression extends SyntaxNode {
  constructor(public expression: SyntaxNode) {
    super(217)
  }

  override get text(): string {
    const text = this.expression.text
    if (this.expression instanceof BinaryExpression && (this.expression.operatorToken instanceof AsteriskToken || this.expression.operatorToken instanceof SlashToken)) {
      return text
    }
    return "(" + text + ")"
  }

  override get location(): string {
    const location = this.expression.location
    if (this.expression instanceof BinaryExpression && (this.expression.operatorToken instanceof AsteriskToken || this.expression.operatorToken instanceof SlashToken)) {
      return location
    }
    return "(" + location + ")"
  }
}
