import { SyntaxNode } from "./SyntaxNode"

export class FirstLiteralToken extends SyntaxNode {
  constructor(public internalText: string, public override pos: number) {
    super(9, pos)
  }
  
  override get text(): string {
    return this.internalText
  }

  override get location() {
    return this.text
  }
}
