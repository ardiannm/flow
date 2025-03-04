import { Transpiler } from "../transpiler"
import { SyntaxNode } from "./SyntaxNode"

export class Comment extends SyntaxNode {
  constructor(public parent: Transpiler, public override pos: number, public end: number) {
    super(2, pos)
  }

  override get text(): string {
    throw new Error("Method not implemented.")
  }

  override get location(): string {
    throw new Error("Method not implemented.")
  }
}
