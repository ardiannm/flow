import { SyntaxNode } from "./SyntaxNode"

export class Block extends SyntaxNode {
  constructor(public statements: SyntaxNode[], public override pos: number) {
    super(241, pos)
  }
  
  override get text(): string {
    return this.statements.map((statement) => statement.text).join("\n")
  }

  override get location() {
    return this.statements.map((statement) => statement.location).join("\n")
  }
}
