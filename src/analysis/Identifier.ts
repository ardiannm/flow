import { Transpiler } from "../transpiler"
import { SyntaxNode } from "./SyntaxNode"

export class Identifier extends SyntaxNode {
  constructor(public parent: Transpiler, public escapedText: string, public address: string) {
    super(80)
  }
  override get text(): string {
    return this.escapedText
  }

  override get reference(): string {
    return this.address
  }
}
