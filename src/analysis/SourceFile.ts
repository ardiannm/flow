import { SyntaxNode } from "./SyntaxNode"

export class SourceFile extends SyntaxNode {
  constructor(public statements: SyntaxNode[]) {
    super(312)
  }

  override get text(): string {
    throw new Error("Method not implemented.")
  }
}
