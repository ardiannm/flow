import { SyntaxKind } from "typescript"

export abstract class SyntaxNode {
  constructor(public kind: SyntaxKind) {}

  abstract get text(): string
  abstract get location(): string
}
