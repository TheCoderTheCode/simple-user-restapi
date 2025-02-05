import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from 'eslint-config-prettier'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.es2021,
      ...globals.node,
      ...globals.jest
    } 
  }},
  { ignores: ["dist", "coverage", "node_modules", "**/*.d.ts"]},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error"
    }
  }
];