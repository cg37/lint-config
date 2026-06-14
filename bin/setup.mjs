#!/usr/bin/env node
/**
 * @craig37/lint-config setup
 *
 * 一键配置 lint-staged + husky，让消费者项目只 lint 暂存区文件。
 *
 * 用法：
 *   npx @craig37/lint-config setup
 *
 * 前置条件：
 *   pnpm add -D @craig37/lint-config husky lint-staged
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const cwd = process.cwd();
const huskyDir = join(cwd, ".husky");
const preCommitPath = join(huskyDir, "pre-commit");
const lintStagedConfigPath = join(cwd, "lint-staged.config.js");

// 1. 确保 .husky 目录存在
if (!existsSync(huskyDir)) {
    mkdirSync(huskyDir, { recursive: true });
    console.log("✅ 已创建 .husky/");
}

// 2. 写入 pre-commit hook
writeFileSync(preCommitPath, "npx lint-staged\n", "utf-8");
// 确保可执行（Unix）
try {
    execSync(`chmod +x "${preCommitPath}"`, { stdio: "ignore" });
} catch {
    // Windows 上忽略
}
console.log("✅ 已创建 .husky/pre-commit");

// 3. 写入 lint-staged.config.js
const lintStagedConfigContent = `import { lintStagedConfig } from "@craig37/lint-config";
export default lintStagedConfig;
`;
writeFileSync(lintStagedConfigPath, lintStagedConfigContent, "utf-8");
console.log("✅ 已创建 lint-staged.config.js");

// 4. 尝试初始化 husky（如果已安装）
try {
    execSync("npx husky", { stdio: "pipe", cwd });
    console.log("✅ husky 已就绪");
} catch {
    // husky 可能未安装，给出提示
}

console.log("");
console.log("🎉 lint-staged 配置完成！");
console.log("");
console.log("请确保已安装依赖：");
console.log("  pnpm add -D husky lint-staged");
console.log("");
console.log("现在 git commit 时只会对暂存区文件运行 ESLint + Prettier。");
