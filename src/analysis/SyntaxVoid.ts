import ts from "typescript"
import { SyntaxNode } from "./SyntaxNode"

export class SyntaxVoid extends SyntaxNode {
  constructor(public override kind: ts.SyntaxKind, public override pos: number) {
    super(kind, pos)
  }

  override get text(): string {
    return ""
  }
  
  override get location(): string {
    return this.text
  }
}
