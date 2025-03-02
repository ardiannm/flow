import { SyntaxKind } from "typescript"
import { FirstStatement } from "./FirstStatement"
import { DeclarationList } from "./FirstStatement"
import { SourceFile } from "./SourceFile"
import { SyntaxNode } from "./SyntaxNode"
import { VariableDeclaration } from "./VariableDeclaration"

export class Identifier extends SyntaxNode {
  constructor(public escapedText: string) {
    super(80)
  }
  override get text(): string {
    return this.escapedText
  }
}

export class Transpiler {
  constructor() {}

  parse(node: SyntaxNode): SyntaxNode {
    switch (node.kind) {
      case 312:
        return this.SourceFile(node as SourceFile)
      case 243:
        return this.FirstStatement(node as FirstStatement)
      case 260:
        return this.VariableDeclaration(node as VariableDeclaration)
      case 80:
        return this.Identifier(node as Identifier)
    }
    throw new Error(`<${SyntaxKind[node.kind]}> has not been implemented: ${node.kind}`)
  }

  Identifier(node: Identifier): SyntaxNode {
    return new Identifier(node.escapedText)
  }

  VariableDeclaration(node: VariableDeclaration): SyntaxNode {
    return new VariableDeclaration(this.parse(node.name), this.parse(node.initializer))
  }

  FirstStatement(node: FirstStatement): SyntaxNode {
    const declarations = (node as unknown as DeclarationList).declarationList.declarations
    return new FirstStatement(declarations.map((declaration) => this.parse(declaration)))
  }

  SourceFile(node: SourceFile) {
    return new SourceFile(node.statements.map((statement) => this.parse(statement)))
  }
}
