import { SyntaxNode } from "./SyntaxNode"

export class Condition {
  constructor(public node: SyntaxNode, public block: boolean = true) {}
}
