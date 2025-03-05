import * as fs from "fs"

import { SyntaxKind } from "typescript"
import { FirstStatement } from "./analysis/FirstStatement"
import { DeclarationList } from "./analysis/FirstStatement"
import { SourceFile } from "./analysis/SourceFile"
import { SyntaxNode } from "./analysis/SyntaxNode"
import { VariableDeclaration } from "./analysis/VariableDeclaration"
import { Identifier } from "./analysis/Identifier"
import { FirstLiteralToken } from "./analysis/FirstLiteralToken"
import { AsteriskToken } from "./analysis/AsteriskToken"
import { MinusToken } from "./analysis/MinusToken"
import { FunctionDeclaration } from "./analysis/FunctionDeclaration"
import { Block } from "./analysis/Block"
import { IfStatement } from "./analysis/IfStatement"
import { BinaryExpression } from "./analysis/BinaryExpression"
import { FirstBinaryOperator } from "./analysis/FirstBinaryOperator"
import { ExpressionStatement } from "./analysis/ExpressionStatement"
import { ConditionalAssignment } from "./analysis/ConditionalAssignment"
import { FirstAssignment } from "./analysis/FirstAssignment"
import { SlashToken } from "./analysis/SlashToken"
import { PlusToken } from "./analysis/PlusToken"
import { EqualsEqualsEqualsToken } from "./analysis/EqualsEqualsEqualsToken"
import { ParenthesizedExpression } from "./analysis/ParenthesizedExpression"
import { CallExpression } from "./analysis/CallExpression"
import { SyntaxVoid } from "./analysis/SyntaxVoid"
import { GreaterThanToken } from "./analysis/GreaterThanToken"
import { GreaterThanEqualsToken } from "./analysis/GreaterThanEqualsToken"
import { AmpersandAmpersandToken } from "./analysis/AmpersandAmpersandToken"
import { PrefixUnaryExpression } from "./analysis/PrefixUnaryExpression"
import { EmitOutput } from "./EmitOutput"
import { Condition } from "./analysis/Condition"

export class Transpiler {
  csvData: EmitOutput[] = []

  private row = 0
  private locations = new Map<string, number>()
  private conditions: Condition[] = []
  private functions = new Map<string, FunctionDeclaration>()
  constructor(public sourceCode: string) {}

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
      case 42:
        return this.AsteriskToken()
      case 41:
        return this.MinusToken()
      case 217:
        return this.ParenthesizedExpression(node as ParenthesizedExpression)
      case 213:
        return this.CallExpression(node as CallExpression)
      case 32:
        return this.GreaterThanToken()
      case 34:
        return this.GreaterThanEqualsToken()
      case 56:
        return this.AmpersandAmpersandToken()
      case 224:
        return this.PrefixUnaryExpression(node as PrefixUnaryExpression)
      case 253:
        return new SyntaxVoid(node.kind)
    }
    throw new Error("<" + SyntaxKind[node.kind] + "> has not been implemented " + node.kind)
  }

  PrefixUnaryExpression(node: PrefixUnaryExpression): SyntaxNode {
    const operand = this.parse(node.operand)
    return new PrefixUnaryExpression(node.operator, operand)
  }

  AmpersandAmpersandToken(): SyntaxNode {
    return new AmpersandAmpersandToken()
  }

  GreaterThanEqualsToken(): SyntaxNode {
    return new GreaterThanEqualsToken()
  }

  GreaterThanToken(): SyntaxNode {
    return new GreaterThanToken()
  }

  CallExpression(node: CallExpression): SyntaxNode {
    const name = node.expression.escapedText
    const functionNode = this.functions.get(name)!
    this.csvData.push(new EmitOutput("// " + name, "", "", "", ""))
    this.row++
    this.parse(functionNode.body)
    const args = ((node as any).arguments as SyntaxNode[]).map((n) => this.parse(n))
    return new CallExpression(node.expression, args)
  }

  ParenthesizedExpression(node: ParenthesizedExpression): SyntaxNode {
    return new ParenthesizedExpression(this.parse(node.expression))
  }

  MinusToken(): SyntaxNode {
    return new MinusToken()
  }

  AsteriskToken(): SyntaxNode {
    return new AsteriskToken()
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
    const operatorToken = this.parse(node.operatorToken)
    const rightNode = this.parse(node.right)
    let leftNode = this.parse(node.left)
    if (operatorToken instanceof FirstAssignment) {
      const syntaxNode = new ConditionalAssignment(leftNode as Identifier, [...this.conditions], rightNode, leftNode)
      this.locations.delete(syntaxNode.identifier.text)
      leftNode = this.parse(node.left)
      this.csvData.push(new EmitOutput(leftNode.text, syntaxNode.text, leftNode.location, syntaxNode.location, ""))
      return syntaxNode
    }
    return new BinaryExpression(leftNode, operatorToken, rightNode)
  }

  IfStatement(node: IfStatement): SyntaxNode {
    const condition = this.parse(node.expression)
    this.conditions.push(new Condition(condition))
    const thenStatement = this.parse(node.thenStatement) as Block
    let elseStatement: Block | undefined = undefined
    if (node.elseStatement) {
      this.conditions[this.conditions.length - 1].block = false
      elseStatement = this.parse(node.elseStatement) as Block
      this.conditions[this.conditions.length - 1].block = true
    }
    this.conditions.pop()
    return new IfStatement(condition, thenStatement, elseStatement)
  }

  Block(node: Block): SyntaxNode {
    const statements = node.statements.map((statement) => this.parse(statement))
    return new Block(statements)
  }

  FunctionDeclaration(node: FunctionDeclaration): SyntaxNode {
    const name = node.name.escapedText
    this.functions.set(name, node as FunctionDeclaration)
    return new SyntaxVoid(node.kind)
  }

  FirstLiteralToken(node: FirstLiteralToken): SyntaxNode {
    return new FirstLiteralToken((node as { text: string }).text)
  }

  Identifier(node: Identifier): SyntaxNode {
    let address: string = "B"
    if (this.locations.has(node.escapedText)) {
      address += this.locations.get(node.escapedText)!
    } else {
      this.row++
      this.locations.set(node.escapedText, this.row)
      address += this.row
    }
    return new Identifier(node.escapedText, address)
  }

  VariableDeclaration(node: VariableDeclaration): SyntaxNode {
    const name = this.parse(node.name)
    const value = this.parse(node.initializer)
    const syntaxNode = new VariableDeclaration(name, value)
    this.csvData.push(new EmitOutput(name.text, value.text, name.location, value.location, ""))
    return syntaxNode
  }

  FirstStatement(node: FirstStatement): SyntaxNode {
    const declarations = (node as unknown as DeclarationList).declarationList.declarations.map((declaration) => this.parse(declaration))
    return new FirstStatement(declarations)
  }

  SourceFile(node: SourceFile) {
    const statements = node.statements.map((statement) => this.parse(statement))
    return new SourceFile(statements)
  }

  escapeCSVValue(value: string | number): string {
    if (value === null || value === undefined || value === "") {
      return ""
    }
    let strValue = String(value)
    if (strValue.includes(",") || strValue.includes("\n") || strValue.includes('"')) {
      strValue = `"${strValue.replace(/"/g, '""')}"`
    }
    return strValue
  }

  generateCsv() {
    const csvContent = this.csvData
      .map((row) => [this.escapeCSVValue(row.variable), this.escapeCSVValue(row.valueLocation), this.escapeCSVValue(row.comment), this.escapeCSVValue(row.value)])
      .join("\n")
    fs.writeFileSync("Ablaufplan Lohnsteuer 2024-11-22-PAP-2025_anlage.csv", csvContent)
  }
}
