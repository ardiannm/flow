import { SyntaxNode } from "./SyntaxNode"

export class SourceFile extends SyntaxNode {
  constructor(public statements: SyntaxNode[], public override pos: number) {
    super(312, pos)
  }

  override get text(): string {
    return this.statements.map((statement) => statement.text).join("\n")
  }

  override get location(): string {
    return this.statements.map((statement) => statement.location).join("\n")
  }
}
