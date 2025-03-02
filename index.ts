import * as fs from "fs"
import * as ts from "typescript"
import { Transpiler } from "./src/transpiler"

// Read the source code from another TypeScript file
const fileName = "C:\\Users\\Nora\\OneDrive\\Desktop\\flow\\src\\main.ts" // Path to your TypeScript file
const sourceCode = fs.readFileSync(fileName, "utf-8")

// Parse the TypeScript code into an AST
const sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest)

const ast = JSON.parse(JSON.stringify(sourceFile))

const transpiler = new Transpiler()

transpiler.parse(ast)

for (const row of transpiler.instructions) {
  console.log(row[0].padEnd(5) + row[1].padEnd(40) + row[2])
}
