import type { UserConfig } from "@commitlint/types";

/**
 * 共享 commitlint 配置
 *
 * 内联 conventional commits 核心规则，零额外 peer 依赖。
 *
 * 使用方式：
 *   在 commitlint.config.js 中：
 *     import commitlintConfig from "@craig37/lint-config/commitlint";
 *     export default commitlintConfig;
 */
const commitlintConfig: UserConfig = {
    rules: {
        // === @commitlint/config-conventional 核心规则 ===
        "type-enum": [
            2,
            "always",
            [
                "build",
                "chore",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "refactor",
                "revert",
                "style",
                "test"
            ]
        ],
        "type-case": [2, "always", "lower-case"],
        "type-empty": [2, "never"],
        "subject-empty": [2, "never"],
        "subject-full-stop": [2, "never", "."],
        "header-max-length": [2, "always", 100],
        "body-leading-blank": [2, "always"],
        "footer-leading-blank": [2, "always"],
        // === 自定义覆盖 ===
        // pnpm/npm 更新依赖时，lock 文件变更说明经常超 100 字符
        "body-max-line-length": [0]
    },
    ignores: [
        (commit) => commit.startsWith("chore(deps)"),
        (commit) => commit.startsWith("fix(deps)"),
        (commit) => commit.startsWith("build(deps)")
    ]
};

export default commitlintConfig;
