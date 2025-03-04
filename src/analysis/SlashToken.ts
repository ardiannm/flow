import { SyntaxNode } from "./SyntaxNode"

export class SlashToken extends SyntaxNode {
  constructor(public override pos: number) {
    super(44, pos)
  }
  
  override get text(): string {
    return "/"
  }

  override get location(): string {
    return this.text
  }
}
