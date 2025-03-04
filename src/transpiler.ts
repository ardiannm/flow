import * as fs from "fs"

import { SyntaxKind, getLeadingCommentRanges } from "typescript"
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
import { GreaterThanToken } from "./analysis/GreaterThanToken"
import { GreaterThanEqualsToken } from "./analysis/GreaterThanEqualsToken"
import { AmpersandAmpersandToken } from "./analysis/AmpersandAmpersandToken"
import { PrefixUnaryExpression } from "./analysis/PrefixUnaryExpression"
import { Comment } from "./analysis/Comment"

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
        return this.FirstBinaryOperator(node as FirstBinaryOperator)
      case 244:
        return this.ExpressionStatement(node as ExpressionStatement)
      case 64:
        return this.FirstAssignment(node as FirstAssignment)
      case 44:
        return this.SlashToken(node as SlashToken)
      case 40:
        return this.PlusToken(node as PlusToken)
      case 37:
        return this.EqualsEqualsEqualsToken(node as EqualsEqualsEqualsToken)
      case 42:
        return this.AsteriskToken(node as AsteriskToken)
      case 41:
        return this.MinusToken(node as MinusToken)
      case 217:
        return this.ParenthesizedExpression(node as ParenthesizedExpression)
      case 213:
        return this.CallExpression(node as CallExpression)
      case 32:
        return this.GreaterThanToken(node as GreaterThanToken)
      case 34:
        return this.GreaterThanEqualsToken(node as GreaterThanEqualsToken)
      case 56:
        return this.AmpersandAmpersandToken(node as AmpersandAmpersandToken)
      case 224:
        return this.PrefixUnaryExpression(node as PrefixUnaryExpression)
      case 253:
        return new SyntaxVoid(node.kind, node.pos)
    }
    throw new Error("<" + SyntaxKind[node.kind] + "> has not been implemented " + node.kind)
  }

  PrefixUnaryExpression(node: PrefixUnaryExpression): SyntaxNode {
    const operand = this.parse(node.operand)
    return new PrefixUnaryExpression(node.operator, operand, node.pos)
  }

  AmpersandAmpersandToken(node: AmpersandAmpersandToken): SyntaxNode {
    return new AmpersandAmpersandToken(node.pos)
  }

  GreaterThanEqualsToken(node: GreaterThanEqualsToken): SyntaxNode {
    return new GreaterThanEqualsToken(node.pos)
  }

  GreaterThanToken(node: GreaterThanToken): SyntaxNode {
    return new GreaterThanToken(node.pos)
  }

  CallExpression(node: CallExpression): SyntaxNode {
    this.saveComment(node)
    const name = node.expression.escapedText
    const functionNode = this.functions.get(name)!
    this.parse(functionNode.body)
    const args = ((node as any).arguments as SyntaxNode[]).map((n) => this.parse(n))
    return new CallExpression(node.expression, args, node.pos)
  }

  ParenthesizedExpression(node: ParenthesizedExpression): SyntaxNode {
    return new ParenthesizedExpression(this.parse(node.expression), node.pos)
  }

  MinusToken(node: MinusToken): SyntaxNode {
    return new MinusToken(node.pos)
  }

  AsteriskToken(node: AsteriskToken): SyntaxNode {
    return new AsteriskToken(node.pos)
  }

  EqualsEqualsEqualsToken(node: EqualsEqualsEqualsToken): SyntaxNode {
    return new EqualsEqualsEqualsToken(node.pos)
  }

  PlusToken(node: PlusToken): SyntaxNode {
    return new PlusToken(node.pos)
  }

  SlashToken(node: SlashToken): SyntaxNode {
    return new SlashToken(node.pos)
  }

  FirstAssignment(node: FirstAssignment): SyntaxNode {
    return new FirstAssignment(node.pos)
  }

  ExpressionStatement(node: ExpressionStatement): SyntaxNode {
    return new ExpressionStatement(this.parse(node.expression), node.pos)
  }

  FirstBinaryOperator(node: FirstBinaryOperator): SyntaxNode {
    return new FirstBinaryOperator(node.pos)
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
      this.csvData.push(new EmitOutput(leftNode.text, value, leftNode.location, valueAsReference, this.conditions.length ? (this.thenOrElse ? "if" : "else") : ""))
    } else {
      leftNode = this.parse(node.left)
    }
    return new BinaryExpression(leftNode, operatorToken, rightNode, node.pos)
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
    return new IfStatement(expression, thenStatement, elseStatement, node.pos)
  }

  Block(node: Block): SyntaxNode {
    const statements = node.statements.map((statement) => this.parse(statement))
    return new Block(statements, node.pos)
  }

  FunctionDeclaration(node: FunctionDeclaration): SyntaxNode {
    const name = node.name.escapedText
    this.functions.set(name, node as FunctionDeclaration)
    return new SyntaxVoid(node.kind, node.pos)
  }

  FirstLiteralToken(node: FirstLiteralToken): SyntaxNode {
    return new FirstLiteralToken((node as { text: string }).text, node.pos)
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
    return new Identifier(node.escapedText, address, node.pos)
  }

  VariableDeclaration(node: VariableDeclaration): SyntaxNode {
    const name = this.parse(node.name)
    const value = this.parse(node.initializer)
    const syntaxNode = new VariableDeclaration(name, value, node.pos)
    this.csvData.push(new EmitOutput(name.text, value.text, name.location, value.location, ""))
    return syntaxNode
  }

  FirstStatement(node: FirstStatement): SyntaxNode {
    const declarations = (node as unknown as DeclarationList).declarationList.declarations.map((declaration) => this.parse(declaration))
    return new FirstStatement(declarations, node.pos)
  }

  SourceFile(node: SourceFile) {
    const statements = node.statements.map((statement) => this.parse(statement))
    return new SourceFile(statements, node.pos)
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

  saveComment(node: SyntaxNode) {
    const comment = getLeadingCommentRanges(this.sourceCode, node.pos)?.map((comment) => new Comment(this, comment.pos, comment.end))
    if (comment) {
      const text = comment.map((comment) => this.sourceCode.substring(comment.pos, comment.end)).join("\n")
      console.log(text)
      this.row++
      this.csvData.push(new EmitOutput("", "", "", "", text))
    }
  }
}
