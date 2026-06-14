import type { UserConfig } from "@commitlint/types";

/**
 * 共享 commitlint 配置
 *
 * 使用方式：
 *   在 commitlint.config.js 中：
 *     import commitlintConfig from "@craig37/lint-config/commitlint";
 *     export default commitlintConfig;
 */
const commitlintConfig: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        // pnpm/npm 更新依赖时，lock 文件变更说明经常超 100 字符
        "body-max-line-length": [0]
    },
    ignores: [
        // 跳过依赖更新机器人（Renovate / Dependabot）的提交
        (commit) => commit.startsWith("chore(deps)"),
        (commit) => commit.startsWith("fix(deps)"),
        (commit) => commit.startsWith("build(deps)")
    ]
};

export default commitlintConfig;
