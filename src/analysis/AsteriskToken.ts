import { SyntaxNode } from "./SyntaxNode"

export class AsteriskToken extends SyntaxNode {
  constructor(public override pos: number) {
    super(42, pos)
  }
  
  override get text(): string {
    return "*"
  }

  override get location() {
    return this.text
  }
}
