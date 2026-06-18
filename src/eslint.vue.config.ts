// 1. 【新增】引入 ESLint 的 Linter 类型
import type { Linter } from "eslint";
import baseConfig from "./eslint.config.js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

// 2. 【修改】将数组赋值给一个带有明确类型注解的变量
const config: Linter.Config[] = [
    ...baseConfig,
    ...pluginVue.configs["flat/recommended"],

    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        languageOptions: {
            parser: tseslint.parser
        }
    },

    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true
                }
            }
        }
    },

    {
        files: ["**/*.vue"],
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
            ],
            "vue/no-setup-props-reactivity-loss": "off"
        }
    }
];

// 3. 【修改】导出该变量
export default config;
