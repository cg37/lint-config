import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettierRecommended from "eslint-plugin-prettier/recommended";

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
