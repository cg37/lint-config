import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettierRecommended from "eslint-plugin-prettier/recommended";

/**
 * 共享 ESLint 扁平化配置 (Flat Config) — 基础版
 *
 * 适用于纯 TypeScript / JavaScript 项目（无框架）。
 *
 * 使用方式：
 *   // eslint.config.js
 *   import eslintConfig from "@craig/lint-config/eslint";
 *   export default eslintConfig;
 *
 * 或者自定义扩展：
 *   import eslintConfig from "@craig/lint-config/eslint";
 *   export default [
 *     ...eslintConfig,
 *     { rules: { "no-console": "warn" } }
 *   ];
 */
export default defineConfig([
    js.configs.recommended,
    tseslint.configs.recommended,
    prettierRecommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                parser: tseslint.parser
            }
        }
    },
    {
        ignores: ["*.d.ts", "node_modules", "dist/", "build/"]
    }
]);
