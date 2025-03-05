import { Condition } from "./Condition"
import { Identifier } from "./Identifier"
import { SyntaxNode } from "./SyntaxNode"

export class ConditionalAssignment extends SyntaxNode {
  constructor(public identifier: Identifier, public conditions: Condition[], public ifBlock: SyntaxNode, public elseBlock: SyntaxNode) {
    super(ifBlock.kind)
  }

  get text(): string {
    let n = this.conditions.length - 1
    let text = this.ifBlock.text
    while (n >= 0) {
      const condition = this.conditions[n]
      if (condition.block) {
        text = `IF(${condition.node.text},${text},${this.elseBlock.text})`
      } else {
        text = `IF(${condition.node.text},${this.elseBlock.text},${text})`
      }
      n--
    }
    return text
  }

  get location(): string {
    let n = this.conditions.length - 1
    let location = this.ifBlock.location
    while (n >= 0) {
      const condition = this.conditions[n]
      if (condition.block) {
        location = `IF(${condition.node.location},${location},${this.elseBlock.location})`
      } else {
        location = `IF(${condition.node.location},${this.elseBlock.location},${location})`
      }
      n--
    }
    return location
  }
}
