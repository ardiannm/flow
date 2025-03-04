import * as fs from "fs"
import * as ts from "typescript"
import { Transpiler } from "./src/transpiler"

console.log()

// Read the source code from another TypeScript file
const fileName = "C:\\Users\\Nora\\OneDrive\\Desktop\\flow\\Ablaufplan Lohnsteuer 2024-11-22-PAP-2025_anlage.ts" // Path to your TypeScript file
const sourceCode = fs.readFileSync(fileName, "utf-8")

// Parse the TypeScript code into an AST
const sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest)

const ast = JSON.parse(JSON.stringify(sourceFile))

const transpiler = new Transpiler(sourceCode)

transpiler.parse(ast)

transpiler.generateCsv()

console.log()
console.log("Finished.")
console.log()
