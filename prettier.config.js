/**
 * 本项目自身的 Prettier 配置
 * 与 src/prettier.config.ts 保持一致，后者是发布给消费者的共享配置。
 */
export default {
    singleQuote: false,
    semi: true,
    tabWidth: 4,
    useTabs: false,
    trailingComma: "none",
    endOfLine: "auto",
    printWidth: 100
};
