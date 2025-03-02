import { SyntaxNode } from "./SyntaxNode"

export class FirstStatement extends SyntaxNode {
  constructor(public declarations: SyntaxNode[]) {
    super(243)
  }

  override get text(): string {
    throw new Error("Method not implemented.")
  }
}
export interface DeclarationList {
  declarationList: {
    declarations: SyntaxNode[]
  }
}
