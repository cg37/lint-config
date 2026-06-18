import js from "@eslint/js";
// 【修复 1】：引入 typescript-eslint 聚合包（包含了 parser 和 plugin）
import tseslint from "typescript-eslint";
import globals from "globals"; // 【修复 2】：引入 globals
import prettierRecommended from "eslint-plugin-prettier/recommended"; // 【修复 3】：补全你的 prettier 引入

// 【修复 4】：ESLint v9 Flat Config 标准写法是直接导出数组，不需要 defineConfig
// 如果你想用封装函数，可以使用 tseslint.config(...)
export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierRecommended,

    {
        files: ["src/**/*.ts", "index.ts"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            // 【修复 5】：使用聚合包导出的 parser
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                // 注意：import.meta.dirname 需要 Node.js >= 20.11。如果版本低会报错，见下方提示
                tsconfigRootDir: import.meta.dirname
            }
        }
    },

    {
        files: ["**/*.{js,mjs,cjs}"]
        // 对于纯 JS 文件，通常建议关闭 TS 相关的类型检查规则，或者重置 parser
        // languageOptions: { parser: js.parser }
    },

    {
        ignores: ["*.d.ts", "node_modules", "dist/", "build/"]
    }
];
