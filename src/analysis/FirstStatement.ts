import { SyntaxNode } from "./SyntaxNode"

export class FirstStatement extends SyntaxNode {
  constructor(public declarations: SyntaxNode[]) {
    super(243)
  }

  override get text(): string {
    return this.declarations.map((declaration) => declaration.text).join("\n")
  }
}
export interface DeclarationList {
  declarationList: {
    declarations: SyntaxNode[]
  }
}
