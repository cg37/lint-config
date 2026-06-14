import type { Config } from "prettier";

/**
 * 共享 Prettier 配置
 *
 * 使用方式：
 *   在 package.json 中：
 *     "prettier": "@craig37/lint-config/prettier"     ← 需要 CJS（自动生成于 dist/src/prettier.config.cjs）
 *
 *   或在 .prettierrc.js / prettier.config.js 中：
 *     import prettierConfig from "@craig37/lint-config/prettier";
 *     export default prettierConfig;
 *
 * 修改此文件后运行 `npm run build`，postbuild 脚本会自动同步 CJS 版本。
 */
const prettierConfig: Config = {
    singleQuote: false,
    semi: true,
    tabWidth: 4,
    useTabs: false,
    trailingComma: "none",
    endOfLine: "auto",
    printWidth: 100
};

export default prettierConfig;
