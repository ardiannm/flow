import { SyntaxNode } from "./SyntaxNode"

export class FirstStatement extends SyntaxNode {
  constructor(public declarations: SyntaxNode[], public override pos: number) {
    super(243, pos)
  }

  override get text(): string {
    return this.declarations.map((declaration) => declaration.text).join("\n")
  }

  override get location() {
    return this.declarations.map((declaration) => declaration.location).join("\n")
  }
}

export interface DeclarationList {
  declarationList: {
    declarations: SyntaxNode[]
  }
}
