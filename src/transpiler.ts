import { SyntaxKind } from "typescript"
import { FirstStatement } from "./analysis/FirstStatement"
import { DeclarationList } from "./analysis/FirstStatement"
import { SourceFile } from "./analysis/SourceFile"
import { SyntaxNode } from "./analysis/SyntaxNode"
import { VariableDeclaration } from "./analysis/VariableDeclaration"
import { Identifier } from "./analysis/Identifier"
import { FirstLiteralToken } from "./analysis/FirstLiteralToken"
import { FunctionDeclaration } from "./analysis/FunctionDeclaration"
import { Block } from "./analysis/Block"
import { IfStatement } from "./analysis/IfStatement"
import { BinaryExpression } from "./analysis/BinaryExpression"
import { FirstBinaryOperator } from "./analysis/FirstBinaryOperator"
import { ExpressionStatement } from "./analysis/ExpressionStatement"
import { FirstAssignment } from "./analysis/FirstAssignment"
import { SlashToken } from "./analysis/SlashToken"
import { PlusToken } from "./analysis/PlusToken"
import { EqualsEqualsEqualsToken } from "./analysis/EqualsEqualsEqualsToken"

export class Transpiler {
  row = 1
  position = new Map<string, number>() // variable name, row
  value = new Map<string, string>() // variable name, row
  instructions: string[][] = []
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
        return this.FirstBinaryOperator()
      case 244:
        return this.ExpressionStatement(node as ExpressionStatement)
      case 64:
        return this.FirstAssignment()
      case 44:
        return this.SlashToken()
      case 40:
        return this.PlusToken()
      case 37:
        return this.EqualsEqualsEqualsToken()
    }
    throw new Error(`<${SyntaxKind[node.kind]}> has not been implemented: ${node.kind}`)
  }

  EqualsEqualsEqualsToken(): SyntaxNode {
    return new EqualsEqualsEqualsToken()
  }

  PlusToken(): SyntaxNode {
    return new PlusToken()
  }

  SlashToken(): SyntaxNode {
    return new SlashToken()
  }

  FirstAssignment(): SyntaxNode {
    return new FirstAssignment()
  }

  ExpressionStatement(node: ExpressionStatement): SyntaxNode {
    return new ExpressionStatement(this.parse(node.expression))
  }

  FirstBinaryOperator(): SyntaxNode {
    return new FirstBinaryOperator()
  }

  BinaryExpression(node: BinaryExpression): SyntaxNode {
    let rightNode = this.parse(node.right)
    let operatorToken = this.parse(node.operatorToken)
    let leftNode: Identifier
    if (operatorToken.kind === 64) {
      this.row++
      this.position.set((node.left as Identifier).escapedText, this.row)
      leftNode = this.parse(node.left) as Identifier
      const syntaxNode = new BinaryExpression(leftNode, operatorToken, rightNode)
      this.value.set(leftNode.text, rightNode.text)
      this.save(syntaxNode.text, syntaxNode.textByReference)
    } else {
      leftNode = this.parse(node.left) as Identifier
    }
    return new BinaryExpression(leftNode, operatorToken, rightNode)
  }

  IfStatement(node: IfStatement): SyntaxNode {
    console.log(node)
    return new IfStatement(this.parse(node.expression), this.parse(node.thenStatement), node.elseStatement ? this.parse(node.elseStatement) : undefined)
  }

  Block(node: Block): SyntaxNode {
    return new Block(node.statements.map((statement) => this.parse(statement)))
  }

  FunctionDeclaration(node: FunctionDeclaration): SyntaxNode {
    return new FunctionDeclaration(this.parse(node.name), this.parse(node.body))
  }

  FirstLiteralToken(node: FirstLiteralToken): SyntaxNode {
    return new FirstLiteralToken((node as { text: string }).text)
  }

  Identifier(node: Identifier): SyntaxNode {
    let address: string
    if (this.position.has(node.escapedText)) {
      address = "A" + this.position.get(node.escapedText)!
    } else {
      this.row++
      this.position.set(node.escapedText, this.row)
      address = "A" + this.row
    }
    return new Identifier(this, node.escapedText, address)
  }

  VariableDeclaration(node: VariableDeclaration): SyntaxNode {
    const name = this.parse(node.name)
    const value = this.parse(node.initializer)
    const syntaxNode = new VariableDeclaration(name, value)
    this.save(syntaxNode.text, syntaxNode.textByReference)
    return syntaxNode
  }

  save(entireFormula: string, formulaAsReference: string) {
    this.instructions.push([this.row + "", entireFormula, formulaAsReference])
  }

  FirstStatement(node: FirstStatement): SyntaxNode {
    const declarations = (node as unknown as DeclarationList).declarationList.declarations
    return new FirstStatement(declarations.map((declaration) => this.parse(declaration)))
  }

  SourceFile(node: SourceFile) {
    return new SourceFile(node.statements.map((statement) => this.parse(statement)))
  }
}
