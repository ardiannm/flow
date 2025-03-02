import { SyntaxNode } from "./SyntaxNode"

export class Block extends SyntaxNode {
  constructor(public statements: SyntaxNode[]) {
    super(241)
  }
  override get text(): string {
    return this.statements.map((statement) => statement.text).join("\n")
  }

  override get textByReference() {
    return this.statements.map((statement) => statement.textByReference).join("\n")
  }
}
