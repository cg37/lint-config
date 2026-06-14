# @craig37/lint-config

TypeScript / React / Vue 项目共享代码规范配置包，开箱即用。

基于 **ESLint 9 扁平化配置 (Flat Config)**，集成 Prettier、commitlint、lint-staged。

## 快速开始

### 1. 安装

#### 基础 TypeScript 项目

```bash
pnpm add -D @craig37/lint-config \
  eslint prettier typescript-eslint @eslint/js globals \
  eslint-plugin-prettier eslint-config-prettier
```

#### React 项目（额外安装）

```bash
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

#### Vue 项目（额外安装）

```bash
pnpm add -D eslint-plugin-vue vue-eslint-parser
```

#### commitlint（可选）

```bash
pnpm add -D @commitlint/cli
```

---

### 2. 配置

#### ESLint

在项目根目录创建 `eslint.config.js`：

**TypeScript 项目**

```js
import eslintConfig from "@craig37/lint-config/eslint";
export default eslintConfig;
```

**React 项目**

```js
import eslintReactConfig from "@craig37/lint-config/eslint-react";
export default eslintReactConfig;
```

**Vue 项目**

```js
import eslintVueConfig from "@craig37/lint-config/eslint-vue";
export default eslintVueConfig;
```

如需自定义规则，展开后追加：

```js
import eslintConfig from "@craig37/lint-config/eslint";

export default [...eslintConfig, { rules: { "no-console": "warn" } }];
```

#### Prettier

在 `package.json` 中添加：

```json
{
    "prettier": "@craig37/lint-config/prettier"
}
```

或通过 `prettier.config.js`：

```js
import prettierConfig from "@craig37/lint-config/prettier";
export default prettierConfig;
```

#### commitlint

创建 `commitlint.config.js`：

```js
import commitlintConfig from "@craig37/lint-config/commitlint";
export default commitlintConfig;
```

---

### 3. 添加 npm scripts

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint --fix .",
        "format": "prettier --write .",
        "format:check": "prettier --check ."
    }
}
```

---

### 4. 可选：Husky 集成

```bash
pnpm add -D husky lint-staged
pnpm exec husky init

# pre-commit hook
echo 'pnpm exec lint-staged' > .husky/pre-commit

# commit-msg hook
echo 'pnpm exec commitlint --edit $1' > .husky/commit-msg
```

创建 `lint-staged.config.js`：

```js
export default {
    "src/**/*.{js,cjs,mjs,jsx,ts,tsx,vue}": ["eslint --fix"],
    "src/**/*.{html,json,css,scss}": ["prettier --write"]
};
```

---

## 子路径导入说明

| 子路径                              | 适用场景                        |
| ----------------------------------- | ------------------------------- |
| `@craig37/lint-config/eslint`       | 纯 TypeScript / JavaScript 项目 |
| `@craig37/lint-config/eslint-react` | React + TypeScript 项目         |
| `@craig37/lint-config/eslint-vue`   | Vue 3 + TypeScript 项目         |
| `@craig37/lint-config/prettier`     | Prettier 配置                   |
| `@craig37/lint-config/commitlint`   | commitlint 配置                 |

---

## 当前规则

### Prettier

| 选项            | 值       |
| --------------- | -------- |
| `singleQuote`   | `false`  |
| `semi`          | `true`   |
| `tabWidth`      | `4`      |
| `useTabs`       | `false`  |
| `trailingComma` | `"none"` |
| `endOfLine`     | `"auto"` |
| `printWidth`    | `100`    |

### ESLint

所有场景共享：

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-prettier` recommended
- 全局变量：`browser` + `node`
- 忽略：`*.d.ts`、`node_modules`、`dist/`、`build/`

React 额外规则：

- `eslint-plugin-react` (recommended + jsx-runtime)
- `eslint-plugin-react-hooks` (exhaustive-deps 等)
- `eslint-plugin-react-refresh` (only-export-components warn)
- `settings.react.version`: `"detect"`

Vue 额外规则：

- `eslint-plugin-vue` (essential)
- `vue/html-self-closing` (error)

---

## 为什么需要手动安装所有依赖

本包所有依赖声明为 **peerDependencies**，需在消费者项目中手动安装。这是 ESLint 生态的结构性约束：

1. **插件必须在消费方解析** — ESLint 插件从消费者项目的 `node_modules` 顶层加载，嵌套在包内会导致 `Failed to load plugin`
2. **实例必须唯一** — 同一项目中不能存在两份 ESLint/Prettier 实例，否则会出现 `Definition for rule '...' was not found` 错误
3. **版本由消费者控制** — 消费者可自由升级，不需要等待本包发版

这是所有 `eslint-config-*` / `prettier-config-*` 包的通用做法。

---

## 许可

MIT
