/**
 * Post-build: 从编译后的 ESM prettier 配置生成 CJS 版本。
 * 消费者在 package.json 中使用 "prettier": "@craig37/lint-config/prettier" 时，
 * Prettier 通过 require() 加载配置，需要 CJS 格式。
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// 动态加载编译后的 ESM 配置
const esmPath = new URL("../dist/src/prettier.config.js", import.meta.url).pathname;
const loaded = require(esmPath);
// require(esm) 会返回 { __esModule: true, default: { ... } }，取 .default 得到纯净配置
const prettierConfig = loaded.default || loaded;

const cjsContent = `"use strict";
/**
 * 共享 Prettier 配置（CJS 版本 — 由 scripts/build-post.mjs 自动生成）
 * 用于 package.json 的 "prettier" 字段：
 *   "prettier": "@craig37/lint-config/prettier"
 */
const prettierConfig = ${JSON.stringify(prettierConfig, null, 4)};
module.exports = prettierConfig;
`;

const cjsPath = new URL("../dist/src/prettier.config.cjs", import.meta.url).pathname;
writeFileSync(cjsPath, cjsContent, "utf-8");
console.log("✅ 已同步 dist/src/prettier.config.cjs");
