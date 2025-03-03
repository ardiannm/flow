import ts from "typescript"

export abstract class SyntaxNode {
  constructor(public kind: ts.SyntaxKind) {}

  abstract get text(): string
  abstract get location(): string
}
