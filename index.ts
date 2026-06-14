/**
 * @craig37/lint-config
 *
 * 多场景共享代码规范配置包，开箱即用。
 *
 * 包含：
 *   - ESLint 扁平化配置 (Flat Config) — 基础 TS / React / Vue 三种
 *   - Prettier 格式化配置
 *   - commitlint 提交信息规范
 *   - lint-staged 推荐配置
 *
 * === 推荐使用子路径导入（按需加载，零副作用） ===
 *
 *   // 基础 TypeScript 项目
 *   import eslintConfig from "@craig37/lint-config/eslint";
 *
 *   // React 项目
 *   import eslintReactConfig from "@craig37/lint-config/eslint-react";
 *
 *   // Vue 项目
 *   import eslintVueConfig from "@craig37/lint-config/eslint-vue";
 *
 *   // Prettier / commitlint（也可从主入口导入）
 *   import prettierConfig from "@craig37/lint-config/prettier";
 *   import commitlintConfig from "@craig37/lint-config/commitlint";
 *
 * === 主入口仅导出通用配置（不含 React / Vue 插件依赖） ===
 *
 *   - eslintConfig       基础 TypeScript 项目
 *   - prettierConfig      共享 Prettier 配置
 *   - commitlintConfig    共享 commitlint 配置
 *   - lintStagedConfig    推荐 lint-staged 配置
 */

export { default as eslintConfig } from "./src/eslint.config.js";
export { default as prettierConfig } from "./src/prettier-config.js";
export { default as commitlintConfig } from "./src/commitlint.config.js";

/**
 * 推荐的 lint-staged 配置
 * 可直接用于 package.json 的 "lint-staged" 字段，
 * 或放在 lint-staged.config.js 中导出。
 */
export const lintStagedConfig: Record<string, string[]> = {
    "src/**/*.{js,cjs,mjs,jsx,ts,tsx,vue}": ["eslint --fix"],
    "src/**/*.{html,json,css,scss}": ["prettier --write"]
};
