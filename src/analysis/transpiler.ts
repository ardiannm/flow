import { SyntaxKind } from "typescript"
import { FirstStatement } from "./FirstStatement"
import { DeclarationList } from "./FirstStatement"
import { SourceFile } from "./SourceFile"
import { SyntaxNode } from "./SyntaxNode"
import { VariableDeclaration } from "./VariableDeclaration"
import { Identifier } from "./Identifier"
import { FirstLiteralToken } from "./FirstLiteralToken"
import { FunctionDeclaration } from "./FunctionDeclaration"
import { Block } from "./Block"
import { IfStatement } from "./IfStatement"
import { BinaryExpression } from "./BinaryExpression"

export class FirstBinaryOperator extends SyntaxNode {
  constructor(public internalText: string) {
    super(30)
  }
  override get text(): string {
    throw new Error("Method not implemented.")
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
      case 9:
        return this.FirstLiteralToken(node as FirstLiteralToken)
      case 262:
        return this.FunctionDeclaration(node as FunctionDeclaration)
      case 241:
        return this.Block(node as Block)
      case 245:
        return this.IfStatement(node as IfStatement)
      case 226:
        return this.BinaryExpression(node as BinaryExpression)
      case 30:
        return this.FirstBinaryOperator() // it has no property of any value
    }
    throw new Error(`<${SyntaxKind[node.kind]}> has not been implemented: ${node.kind}`)
  }

  FirstBinaryOperator(): SyntaxNode {
    return new FirstBinaryOperator("?")
  }

  BinaryExpression(node: BinaryExpression): SyntaxNode {
    return new BinaryExpression(this.parse(node.left), this.parse(node.operatorToken), this.parse(node.right))
  }

  IfStatement(node: IfStatement): SyntaxNode {
    return new IfStatement(this.parse(node.expression), this.parse(node.thenStatement))
  }

  Block(node: Block): SyntaxNode {
    return new Block(node.statements.map((statement) => this.parse(statement)))
  }

  FunctionDeclaration(node: FunctionDeclaration): SyntaxNode {
    return new FunctionDeclaration(this.parse(node.name), this.parse(node.body))
  }

  FirstLiteralToken(node: FirstLiteralToken): SyntaxNode {
    return new FirstLiteralToken(node.internalText)
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
