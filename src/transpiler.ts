import { SyntaxKind } from "typescript"

interface Node {
  kind: number
}

interface Program extends Node {
  kind: 312
  statements: Node[]
}

interface FirstStatement extends Node {
  kind: 243
  declarationList: {
    declarations: Node[]
  }
}

interface VariableDeclaration extends Node {
  kind: 260
  name: {
    escapedText: string
  }
  initializer: Node
}

interface FirstLiteralToken extends Node {
  kind: 9
  text: string
}

interface FunctionDeclaration extends Node {
  kind: 262
  text: string
  name: {
    escapedText: string
  }
  body: {
    statements: Node[]
  }
}

interface IfStatement extends Node {
  kind: 242
  expression: Node
  thenStatement: Node
}

interface BinaryExpression extends Node {
  kind: 226
  operatorToken: Node
}

export class Transpiler {
  stack: string[] = []

  transpile(node: Node) {
    switch (node.kind) {
      case 312: {
        return this.transpileStatements(node as Program)
      }
      case 243: {
        return this.transpileFirstStatement(node as FirstStatement)
      }
      case 260: {
        return this.transpileVariableDeclaration(node as VariableDeclaration)
      }
      case 9: {
        return this.transpileFirstLiteralToken(node as FirstLiteralToken)
      }
      case 262: {
        return this.transpileFunctionDeclaration(node as FunctionDeclaration)
      }
      case 245: {
        return this.transpileIfStatement(node as IfStatement)
      }
      case 226: {
        return this.transpileBinaryExpression(node as BinaryExpression)
      }
    }
    throw "Node " + SyntaxKind[node.kind] + " of kind " + node.kind + " not implemented"
  }

  transpileBinaryExpression(node: BinaryExpression) {
    const operator = this.bindOperatorToken(node.operatorToken)
    console.log(node, operator)
  }

  bindOperatorToken(node: Node) {
    switch (node.kind) {
      case 30:
        return "<"
    }
    throw "Operator token " + SyntaxKind[node.kind] + " of kind " + node.kind + " not implemented"
  }

  transpileIfStatement(node: IfStatement) {
    this.transpile(node.expression)
  }

  transpileFunctionDeclaration(node: FunctionDeclaration) {
    node.body.statements.map((node) => this.transpile(node))
  }

  transpileFirstLiteralToken(node: FirstLiteralToken) {
    return node.text
  }

  transpileVariableDeclaration(node: VariableDeclaration) {
    node.name.escapedText + "=" + this.transpile(node.initializer)
  }

  transpileFirstStatement(node: FirstStatement) {
    node.declarationList.declarations.forEach((declaration) => this.transpile(declaration))
  }

  transpileStatements(node: Program) {
    for (const statement of node.statements) this.transpile(statement)
  }
}
