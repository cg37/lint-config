# @craig/lint-config

TypeScript / React / Vue 项目共享代码规范配置包，开箱即用。

## 包含的配置

| 配置 | 说明 |
|------|------|
| **ESLint (基础)** | 适用于纯 TypeScript / JavaScript 项目 |
| **ESLint (React)** | 基础 + React / JSX / Hooks / Refresh 规则 |
| **ESLint (Vue)** | 基础 + Vue 3 SFC 规则 |
| **Prettier** | 代码格式化规则 |
| **commitlint** | Git 提交信息规范（基于 conventional commits） |
| **lint-staged** | Git 暂存区文件自动检查（推荐配置） |

## 安装

```bash
# pnpm
pnpm add -D @craig/lint-config

# 核心依赖（所有场景都需要）
pnpm add -D eslint prettier typescript-eslint @eslint/js globals \
  eslint-plugin-prettier eslint-config-prettier
```

根据你的项目类型，安装对应的额外依赖：

### 纯 TypeScript 项目

```bash
# 核心依赖已覆盖，无需额外安装
```

### React 项目

```bash
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### Vue 项目

```bash
pnpm add -D eslint-plugin-vue vue-eslint-parser
```

### commitlint（可选，所有场景通用）

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

## 使用方式

### ESLint — 纯 TypeScript 项目

在 `eslint.config.js` 中：

```js
import { eslintConfig } from "@craig/lint-config";
export default eslintConfig;
```

### ESLint — React 项目

在 `eslint.config.js` 中：

```js
import { eslintReactConfig } from "@craig/lint-config";
export default eslintReactConfig;
```

### ESLint — Vue 项目

在 `eslint.config.js` 中：

```js
import { eslintVueConfig } from "@craig/lint-config";
export default eslintVueConfig;
```

### 自定义扩展规则

任意场景下均可扩展：

```js
import { eslintReactConfig } from "@craig/lint-config";

export default [
    ...eslintReactConfig,
    {
        rules: {
            "no-console": "warn"
        }
    }
];
```

### Prettier

**方式一：** 在 `prettier.config.js` 中：

```js
import { prettierConfig } from "@craig/lint-config";
export default prettierConfig;
```

**方式二：** 在 `package.json` 中：

```json
{
    "prettier": "@craig/lint-config/prettier"
}
```

### commitlint

在 `commitlint.config.js` 中：

```js
import { commitlintConfig } from "@craig/lint-config";
export default commitlintConfig;
```

### lint-staged

在 `lint-staged.config.js` 中：

```js
import { lintStagedConfig } from "@craig/lint-config";
export default lintStagedConfig;
```

或在 `package.json` 中：

```json
{
    "lint-staged": {
        "src/**/*.{js,cjs,mjs,jsx,ts,tsx,vue}": ["eslint --fix"],
        "src/**/*.{html,json,css,scss}": ["prettier --write"]
    }
}
```

### package.json 推荐 scripts

**纯 TS 项目：**
```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint --fix .",
        "format": "prettier --write \"src/**/*.{js,ts,css,scss,html,json}\"",
        "format:check": "prettier --check \"src/**/*.{js,ts,css,scss,html,json}\""
    }
}
```

**React 项目：**
```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint --fix .",
        "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,scss,html,json}\"",
        "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,css,scss,html,json}\""
    }
}
```

**Vue 项目：**
```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint --fix .",
        "format": "prettier --write \"src/**/*.{js,ts,vue,css,scss,html,json}\"",
        "format:check": "prettier --check \"src/**/*.{js,ts,vue,css,scss,html,json}\""
    }
}
```

## Prettier 默认规则

| 规则 | 值 |
|------|-----|
| `singleQuote` | `false` (双引号) |
| `semi` | `true` (保留分号) |
| `tabWidth` | `4` |
| `useTabs` | `false` (空格缩进) |
| `trailingComma` | `"none"` (无尾逗号) |
| `endOfLine` | `"auto"` |
| `printWidth` | `100` |

## ESLint 默认规则

### 基础（所有场景）
- `@eslint/js` recommended
- `typescript-eslint` recommended
- `prettier` recommended（与 Prettier 集成，避免冲突）
- 忽略 `*.d.ts`、`node_modules`、`dist/`、`build/`

### React 额外规则
- `eslint-plugin-react` flat/recommended + flat/jsx-runtime
- `eslint-plugin-react-hooks` recommended
- `eslint-plugin-react-refresh` only-export-components (warn)

### Vue 额外规则
- `eslint-plugin-vue` flat/essential
- Vue 组件强制自闭合 (`vue/html-self-closing`)

## 许可

MIT
