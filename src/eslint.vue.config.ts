import baseConfig from "./eslint.config.js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/**
 * 共享 ESLint 扁平化配置 (Flat Config) — Vue 版
 *
 * 适用于 Vue 3 + TypeScript 项目。
 * 在基础 TS 配置之上添加了 Vue 相关规则。
 *
 * 使用方式：
 *   // eslint.config.js
 *   import eslintVueConfig from "@craig37/lint-config/eslint-vue";
 *   export default eslintVueConfig;
 *
 * 或者自定义扩展：
 *   import eslintVueConfig from "@craig37/lint-config/eslint-vue";
 *   export default [
 *     ...eslintVueConfig,
 *     { rules: { "no-console": "warn" } }
 *   ];
 */
export default [
    ...baseConfig,
    pluginVue.configs["flat/essential"],
    {
        files: ["**/*.vue"],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        }
    },
    {
        rules: {
            "vue/html-self-closing": [
                "error",
                {
                    html: {
                        void: "always",
                        normal: "never",
                        component: "always"
                    },
                    svg: "always",
                    math: "always"
                }
            ]
        }
    }
];
