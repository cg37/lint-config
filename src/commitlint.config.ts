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
    extends: ["@commitlint/config-conventional"]
};

export default commitlintConfig;
