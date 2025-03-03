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
import { FirstAssignment } from "./analysis/FirstAssignment"
import { SlashToken } from "./analysis/SlashToken"
import { PlusToken } from "./analysis/PlusToken"
import { EqualsEqualsEqualsToken } from "./analysis/EqualsEqualsEqualsToken"
import { ParenthesizedExpression } from "./analysis/ParenthesizedExpression"
import { CallExpression } from "./analysis/CallExpression"
import { SyntaxVoid } from "./analysis/SyntaxVoid"

export class EmitOutput {
  constructor(public variable: string, public value: string, public variableLocation: string, public valueLocation: string, public comment: string) {}
}

export class Transpiler {
  row = 0
  position = new Map<string, number>()
  conditions: SyntaxNode[] = []
  thenOrElse = true
  csvData: EmitOutput[] = []
  private functions = new Map<string, FunctionDeclaration>()

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
    }
    throw new Error("<" + SyntaxKind[node.kind] + "> has not been implemented " + node.kind)
  }

  CallExpression(node: CallExpression): SyntaxNode {
    const functionNode = this.functions.get(node.expression.escapedText)!
    const name = this.parse(functionNode.name)
    this.csvData.push(new EmitOutput(name.text, "", name.location, "", "execute routine"))
    this.parse(functionNode.body)
    return new SyntaxVoid(functionNode.kind)
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
    let rightNode = this.parse(node.right)
    let operatorToken = this.parse(node.operatorToken)
    let leftNode: SyntaxNode
    var value = ""
    var valueAsReference = ""
    if (operatorToken instanceof FirstAssignment) {
      const prevVar = this.parse(node.left)
      this.row++
      this.position.set((node.left as Identifier).escapedText, this.row)
      leftNode = this.parse(node.left)
      value += rightNode.text
      valueAsReference += rightNode.location
      let n = this.conditions.length - 1
      if (this.thenOrElse) {
        while (n >= 0) {
          const condition = this.conditions[n]
          value = `IF(${condition.text},${value},${prevVar.text})`
          valueAsReference = `IF(${condition.location},${valueAsReference},${prevVar.location})`
          n--
        }
      } else {
        while (n >= 0) {
          const condition = this.conditions[n]
          value = `IF(${condition.text},${prevVar.text},${value})`
          valueAsReference = `IF(${condition.location},${prevVar.location},${valueAsReference})`
          n--
        }
      }
      this.csvData.push(new EmitOutput(leftNode.text, value, leftNode.location, valueAsReference, this.thenOrElse ? "if" : "else"))
    } else {
      leftNode = this.parse(node.left)
    }
    return new BinaryExpression(leftNode, operatorToken, rightNode)
  }

  IfStatement(node: IfStatement): SyntaxNode {
    const expression = this.parse(node.expression)
    this.conditions.push(expression)
    this.thenOrElse = true
    const thenStatement = this.parse(node.thenStatement) as Block
    let elseStatement: Block | undefined
    if (node.elseStatement) {
      this.thenOrElse = false
      elseStatement = this.parse(node.elseStatement) as Block
    }
    this.conditions.pop()
    return new IfStatement(expression, thenStatement, elseStatement)
  }

  Block(node: Block): SyntaxNode {
    const statements = node.statements.map((statement) => this.parse(statement))
    return new Block(statements)
  }

  FunctionDeclaration(node: FunctionDeclaration): SyntaxNode {
    const name = this.parse(node.name)
    this.csvData.push(new EmitOutput(name.text, "", name.location, "", "routine"))
    this.functions.set(name.text, node as FunctionDeclaration)
    return new SyntaxVoid(node.kind)
  }

  FirstLiteralToken(node: FirstLiteralToken): SyntaxNode {
    return new FirstLiteralToken((node as { text: string }).text)
  }

  Identifier(node: Identifier): SyntaxNode {
    let address: string = "B"
    if (this.position.has(node.escapedText)) {
      address += this.position.get(node.escapedText)!
    } else {
      this.row++
      this.position.set(node.escapedText, this.row)
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
    const declarations = (node as unknown as DeclarationList).declarationList.declarations
    return new FirstStatement(declarations.map((declaration) => this.parse(declaration)))
  }

  SourceFile(node: SourceFile) {
    return new SourceFile(node.statements.map((statement) => this.parse(statement)))
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
