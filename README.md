# @craig37/lint-config

TypeScript / React / Vue 项目共享代码规范配置包，开箱即用。

基于 **ESLint 9 扁平化配置 (Flat Config)**，集成 Prettier、commitlint、lint-staged。

## 包含的配置

| 子路径导入                          | 说明                                                     |
| ----------------------------------- | -------------------------------------------------------- |
| `@craig37/lint-config/eslint`       | ESLint 基础配置 — 纯 TypeScript / JavaScript 项目        |
| `@craig37/lint-config/eslint-react` | ESLint React 配置 — 基础 + React / JSX / Hooks           |
| `@craig37/lint-config/eslint-vue`   | ESLint Vue 配置 — 基础 + Vue 3 SFC                       |
| `@craig37/lint-config/prettier`     | Prettier 格式化规则                                      |
| `@craig37/lint-config/commitlint`   | commitlint 提交信息规范（Conventional Commits）          |
| `@craig37/lint-config`（主入口）    | 通用配置：基础 ESLint、Prettier、commitlint、lint-staged |

> [!IMPORTANT]
> **请始终使用子路径导入**（如 `/eslint-react`、`/eslint-vue`）。
> 主入口不含 React / Vue 配置，这是有意为之——避免纯 Vue 项目被迫加载 React 插件（反之亦然）。
> 详见下方 [为什么需要子路径导入](#为什么需要子路径导入)。
> [!NOTE]
> 本包所有依赖声明为 **peerDependencies**，需消费者手动安装。
> 这是 ESLint 生态的结构性约束，详见 [为什么需要手动安装依赖](#为什么需要手动安装依赖)。

---

## 安装

> [!NOTE]
> 本包的所有依赖均声明为 **peerDependencies**（对等依赖），而非 `dependencies`。
> 这是 ESLint / Prettier 配置包生态的惯例——ESLint 和插件必须在**消费者项目的 `node_modules` 顶层**解析，
> 否则会出现 `Failed to load plugin` 或多实例冲突。
> 详见 [为什么需要手动安装依赖](#为什么需要手动安装依赖)。

### 所有项目都需要

```bash
pnpm add -D @craig37/lint-config eslint prettier typescript-eslint @eslint/js globals eslint-plugin-prettier eslint-config-prettier
```

> [!NOTE]
> 使用 npm / yarn 同理，将 `pnpm add -D` 替换为 `npm install --save-dev` 或 `yarn add -D`。

### React 项目额外依赖

```bash
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### Vue 项目额外依赖

```bash
pnpm add -D eslint-plugin-vue vue-eslint-parser
```

### 可选：commitlint

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

---

## 使用

### ESLint — 基础 TypeScript 项目

创建 `eslint.config.js`：

```js
import eslintConfig from "@craig37/lint-config/eslint";

export default eslintConfig;
```

自定义扩展：

```js
import eslintConfig from "@craig37/lint-config/eslint";

export default [
    ...eslintConfig,
    {
        rules: {
            "no-console": "warn",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
        }
    }
];
```

### ESLint — React 项目

```js
import eslintReactConfig from "@craig37/lint-config/eslint-react";

export default eslintReactConfig;
```

包含的规则集：

| 规则来源                        | 说明                             |
| ------------------------------- | -------------------------------- |
| `@eslint/js` recommended        | JavaScript 最佳实践              |
| `typescript-eslint` recommended | TypeScript 规则                  |
| `eslint-plugin-react` flat      | React 核心规则 + JSX 运行时      |
| `eslint-plugin-react-hooks`     | Hooks 规则（exhaustive-deps 等） |
| `eslint-plugin-react-refresh`   | Vite HMR 导出检查                |
| `eslint-plugin-prettier`        | Prettier 集成（避免规则冲突）    |

### ESLint — Vue 项目

```js
import eslintVueConfig from "@craig37/lint-config/eslint-vue";

export default eslintVueConfig;
```

包含的规则集：

| 规则来源                      | 说明                           |
| ----------------------------- | ------------------------------ |
| 基础 ESLint 全套              | JS + TS + Prettier             |
| `eslint-plugin-vue` essential | Vue 3 SFC 核心规则             |
| `vue/html-self-closing`       | 自闭合标签规范（支持自动修复） |

### Prettier

**方式一** — `package.json` 中声明（推荐，无需额外文件）：

```json
{
    "prettier": "@craig37/lint-config/prettier"
}
```

**方式二** — `prettier.config.js`：

```js
import prettierConfig from "@craig37/lint-config/prettier";
export default prettierConfig;
```

当前 Prettier 规则：

| 选项            | 值       |
| --------------- | -------- |
| `singleQuote`   | `false`  |
| `semi`          | `true`   |
| `tabWidth`      | `4`      |
| `useTabs`       | `false`  |
| `trailingComma` | `"none"` |
| `endOfLine`     | `"auto"` |
| `printWidth`    | `100`    |

### commitlint

创建 `commitlint.config.js`：

```js
import commitlintConfig from "@craig37/lint-config/commitlint";
export default commitlintConfig;
```

配合 Husky 使用：

```bash
pnpm add -D husky
npx husky init
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg
```

提交信息格式示例：

```
feat: add user login
fix: resolve navbar overflow
docs: update API reference
chore(deps): bump typescript to 5.7
```

### lint-staged（推荐配置）

安装 `lint-staged` + `husky`：

```bash
pnpm add -D lint-staged husky
npx husky init
echo 'npx lint-staged' > .husky/pre-commit
```

创建 `lint-staged.config.js`：

```js
import { lintStagedConfig } from "@craig37/lint-config";
export default lintStagedConfig;
```

等效手动配置（也可直接写在 `package.json` 中）：

```json
{
    "lint-staged": {
        "src/**/*.{js,cjs,mjs,jsx,ts,tsx,vue}": ["eslint --fix"],
        "src/**/*.{html,json,css,scss}": ["prettier --write"]
    }
}
```

### 推荐 package.json scripts

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

## 为什么需要子路径导入

| 导入方式                                                     | 加载的模块                                    | 纯 Vue 项目  | 纯 React 项目 |
| ------------------------------------------------------------ | --------------------------------------------- | ------------ | ------------- |
| `import cfg from "@craig37/lint-config/eslint-vue"`          | `eslint.config.js` + `eslint.vue.config.js`   | ✅ 正常      | —             |
| `import cfg from "@craig37/lint-config/eslint-react"`        | `eslint.config.js` + `eslint.react.config.js` | —            | ✅ 正常       |
| ~~`import { eslintVueConfig } from "@craig37/lint-config"`~~ | **全部模块**（含 React 插件）                 | ❌ 报错/冗余 | ❌ 报错/冗余  |

ESM 的 `export { ... } from ...` 是**静态急切**的——只要 import 了 barrel 文件，所有 re-export 的模块都会被加载并执行顶层代码。如果 `eslint-plugin-react` 未安装，Node.js 会直接抛出 `MODULE_NOT_FOUND`。

因此主入口**仅导出无框架依赖的通用配置**，框架专属配置通过子路径按需加载，互不干扰。

---

## 完整工作流

```mermaid
flowchart LR
    A[git add] --> B["pre-commit hook<br/>(lint-staged)"]
    B --> C[eslint --fix]
    B --> D[prettier --write]
    C --> E[git commit]
    D --> E
    E --> F["commit-msg hook<br/>(commitlint)"]
    F --> G[检查 commit message]
```

1. `git add` 暂存文件
2. **pre-commit**：lint-staged 对暂存文件运行 ESLint + Prettier
3. **commit-msg**：commitlint 校验提交信息是否符合 Conventional Commits

---

## 为什么需要手动安装依赖

`@craig37/lint-config` 的所有依赖都声明为 **peerDependencies**，原因有三：

### 1. ESLint 插件必须在消费方解析

编译产物中的 import 语句：

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
```

这些模块在**运行时**由 Node.js 从消费者项目的 `node_modules/` 解析。如果它们作为 `dependencies` 嵌套在 `@craig37/lint-config/node_modules/` 中，ESLint 的插件加载机制找不到它们，直接报 `Failed to load plugin`。

### 2. ESLint / Prettier 必须全局唯一

同一项目中不能存在两份 ESLint 或 Prettier 实例——插件的 rule 定义只会注册到**第一个被加载的实例**。如果本包自带了一份，消费者的项目也有一份，就会出现 `Definition for rule '...' was not found` 这类诡异错误。

### 3. 版本控制权归消费者

```json
"peerDependencies": {
    "eslint": ">=9.0.0",
    "prettier": ">=3.0.0"
}
```

消费者可以自由升级 ESLint/Prettier，不需要等待本包发版。这是 npm 生态中所有 `eslint-config-*` / `prettier-config-*` 包的通用做法。

| 对比   | `dependencies`             | `peerDependencies`                 |
| ------ | -------------------------- | ---------------------------------- |
| 安装   | 自动安装，一条命令         | 手动安装，命令较长                 |
| 解析   | 嵌套在包内 → ESLint 找不到 | 项目顶层 → ESLint 能正确解析       |
| 版本   | 被包锁定，消费者无法控制   | 消费者自由选择，只要满足 `>=` 范围 |
| 多实例 | 可能安装两份 → 诡异报错    | 始终只有一份                       |

**结论**：长安装命令是 ESLint 架构限制带来的必要代价，不是偷懒。

---

## ESLint 规则总览

### 基础规则（所有场景共享）

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-prettier` recommended（与 Prettier 集成，关闭冲突规则）
- 全局变量：`browser` + `node`
- 忽略：`*.d.ts`、`node_modules`、`dist/`、`build/`

### React 额外规则

- `eslint-plugin-react` flat/recommended + flat/jsx-runtime
- `eslint-plugin-react-hooks` recommended
- `eslint-plugin-react-refresh` only-export-components (warn)
- `settings.react.version`: `"detect"`（自动检测 React 版本）

### Vue 额外规则

- `eslint-plugin-vue` flat/essential
- `vue/html-self-closing`：强制自闭合（void 元素、组件、SVG/math 始终自闭合）

---

## 发布

本项目使用 GitHub Actions 自动发布到 npm。

### 前置条件

在 GitHub 仓库的 **Settings → Secrets and variables → Actions** 中添加：

| Secret      | 说明                                           |
| ----------- | ---------------------------------------------- |
| `NPM_TOKEN` | npm 的 Automation Access Token（用于自动发布） |

### 发布步骤

```bash
# 1. 更新版本号
npm version patch   # 或 minor / major

# 2. 推送 tag（触发发布）
git push --follow-tags
```

CI 会在 Push tag 或创建 GitHub Release 时自动运行以下检查，通过后发布到 npm：

```mermaid
flowchart LR
    A["git push --follow-tags<br/>(v1.0.1)"] --> B[TypeScript 类型检查]
    B --> C[Prettier 格式检查]
    C --> D["npm publish --provenance"]
    D --> E["@craig37/lint-config@1.0.1<br/>已发布到 npm"]
```

> `--provenance` 会生成 npm 来源证明，消费者可通过 `npm audit signatures` 验证包确实来自本仓库。

---

## 许可

MIT
