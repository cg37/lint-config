import baseConfig from "./eslint.config.js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
// 优化点 3：只引入关闭冲突的配置，不再把 Prettier 作为 ESLint 规则运行
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * 共享 ESLint 扁平化配置 (Flat Config) — React 版
 */
export default [
    ...baseConfig,

    {
        files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],

        // 引入 React 官方推荐配置
        ...pluginReact.configs.flat.recommended,
        ...pluginReact.configs.flat["jsx-runtime"],

        plugins: {
            "react-refresh": pluginReactRefresh,
            "react-hooks": pluginReactHooks
        },

        rules: {
            // 优化点 2：允许导出常量/类型，避免 main.tsx 报警告
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            ...pluginReactHooks.configs.recommended.rules
        },

        settings: {
            react: {
                version: "detect"
            }
        }
    },

    // 针对特定文件的特殊处理（可选）
    {
        files: ["**/main.{js,jsx,ts,tsx}"],
        rules: {
            // 入口文件通常不需要 React Refresh 检查，直接关闭
            "react-refresh/only-export-components": "off"
        }
    },

    // 优化点 3：放在最后，纯粹用于关闭与 Prettier 冲突的 ESLint 规则
    eslintConfigPrettier
];
