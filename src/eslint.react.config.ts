import baseConfig from "./eslint.config.js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/**
 * 共享 ESLint 扁平化配置 (Flat Config) — React 版
 *
 * 适用于 React + TypeScript 项目。
 * 在基础 TS 配置之上添加了 React / JSX / Hooks 相关规则。
 *
 * 使用方式：
 *   // eslint.config.js
 *   import eslintReactConfig from "@craig37/lint-config/eslint-react";
 *   export default eslintReactConfig;
 *
 * 或者自定义扩展：
 *   import eslintReactConfig from "@craig37/lint-config/eslint-react";
 *   export default [
 *     ...eslintReactConfig,
 *     { rules: { "no-console": "warn" } }
 *   ];
 */
export default [
    ...baseConfig,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat["jsx-runtime"],
    {
        plugins: {
            "react-hooks": pluginReactHooks
        },
        rules: pluginReactHooks.configs.recommended.rules
    },
    {
        plugins: {
            "react-refresh": pluginReactRefresh
        },
        rules: {
            "react-refresh/only-export-components": "warn"
        }
    },
    {
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    eslintPluginPrettierRecommended
];
