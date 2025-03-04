import { Identifier } from "./Identifier"
import { SyntaxNode } from "./SyntaxNode"

export class CallExpression extends SyntaxNode {
  constructor(public expression: Identifier, public args: SyntaxNode[], public override pos: number) {
    super(213, pos)
  }

  override get text(): string {
    return this.expression.escapedText + "(" + this.args.map((node) => node.text).join(",") + ")"
  }

  override get location(): string {
    return this.expression.escapedText + "(" + this.args.map((node) => node.location).join(",") + ")"
  }
}
