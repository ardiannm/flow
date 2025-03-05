import { Identifier } from "./Identifier"
import { SyntaxNode } from "./SyntaxNode"

export class ExpressionStatement extends SyntaxNode {
  constructor(public expression: SyntaxNode) {
    super(244)
  }

  override get text(): string {
    return this.expression.text
  }

  override get location(): string {
    return this.expression.location
  }
}

export class ConditionalAssignment extends SyntaxNode {
  constructor(public identifier: Identifier, public conditions: SyntaxNode[], public ifBlock: SyntaxNode, public elseBlock: SyntaxNode) {
    super(ifBlock.kind)
  }

  get text(): string {
    let text = this.ifBlock.text
    let n = this.conditions.length - 1
    while (n >= 0) {
      text = `IF(${this.conditions[n].text},${text},${this.elseBlock.text})`
      n--
    }
    return text
  }

  get location(): string {
    let location = this.ifBlock.location
    let n = this.conditions.length - 1
    while (n >= 0) {
      location = `IF(${this.conditions[n].location},${location},${this.elseBlock.location})`
      n--
    }
    return location
  }
}
