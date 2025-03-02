import { SyntaxNode } from "./SyntaxNode"

export class FirstAssignment extends SyntaxNode {
  constructor() {
    super(64)
  }
  override get text(): string {
    return "="
  }
}
