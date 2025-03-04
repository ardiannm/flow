import { SyntaxNode } from "./SyntaxNode"

export class AmpersandAmpersandToken extends SyntaxNode {
  constructor(public override pos: number) {
    super(56, pos)
  }
  
  override get text(): string {
    return "&&"
  }

  override get location(): string {
    return this.text
  }
}
