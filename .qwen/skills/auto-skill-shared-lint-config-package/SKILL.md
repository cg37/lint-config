---
name: shared-lint-config-package
description: Build a shared ESLint + Prettier config npm package with subpath exports, peerDependencies, and correct local-vs-published configuration separation
source: auto-skill
extracted_at: '2026-06-14T15:08:38.462Z'
---

# Shared ESLint/Prettier Config Package Patterns

## Problem

When building an npm package that exports ESLint/Prettier configurations:

1. **Prettier CLI doesn't load `.ts` config files** — `src/prettier-config.ts` (the published shared config) is never read by Prettier during local development. The project itself needs a `.prettierrc` or `prettier.config.js`.
2. **ESLint can't natively load `.ts` config files** — the project's own `eslint.config.js/mjs` must be plain JS/JSON/MJS, not a reference to `src/eslint.config.ts`.
3. **Barrel files cause eager loading** — `export { x } from "module"` statically loads ALL re-exported modules. If a barrel file re-exports both React and Vue configs, importing it in a pure Vue project will fail because `eslint-plugin-react` is not installed.

## Solution

### Directory Structure

```
├── .prettierrc              # LOCAL dev: consumed by Prettier CLI for this project
├── .prettierignore          # Include .qwen/ to avoid CI format:check failures
├── eslint.config.mjs        # LOCAL dev: ESLint config for linting this package's own code
├── package.json             # No "main" or "types" — only subpath exports
├── src/
│   ├── eslint.config.ts     # PUBLISHED: shared base ESLint config
│   ├── eslint.react.config.ts  # PUBLISHED: shared React config
│   ├── eslint.vue.config.ts    # PUBLISHED: shared Vue config
│   └── prettier-config.ts   # PUBLISHED: shared Prettier config
└── scripts/
    └── build-post.mjs       # Generates CJS version of prettier-config
```

### package.json — Subpath Exports Only

Remove `"main"`, `"types"`, and `"."` export. Use only subpath exports:

```json
{
    "exports": {
        "./eslint": {
            "types": "./dist/src/eslint.config.d.ts",
            "default": "./dist/src/eslint.config.js"
        },
        "./eslint-react": {
            "types": "./dist/src/eslint.react.config.d.ts",
            "default": "./dist/src/eslint.react.config.js"
        },
        "./eslint-vue": {
            "types": "./dist/src/eslint.vue.config.d.ts",
            "default": "./dist/src/eslint.vue.config.js"
        },
        "./prettier": {
            "types": "./dist/src/prettier-config.d.ts",
            "import": "./dist/src/prettier-config.js",
            "require": "./dist/src/prettier-config.cjs"
        }
    },
    "files": ["dist/"]
}
```

### peerDependencies (not dependencies)

ESLint plugins must resolve from the consumer's `node_modules` top-level:

```json
{
    "peerDependencies": {
        "eslint": ">=9.0.0",
        "prettier": ">=3.0.0",
        "@eslint/js": ">=9.0.0",
        "eslint-plugin-prettier": ">=5.0.0",
        "eslint-plugin-react": ">=7.0.0"
    },
    "peerDependenciesMeta": {
        "eslint-plugin-react": { "optional": true }
    }
}
```

### Local vs Published Config Separation

| Config | Purpose | File |
|--------|---------|------|
| Local ESLint | Lint this package's own source code | `eslint.config.mjs` (inline JS, not .ts) |
| Published ESLint | Shared config for consumers | `src/eslint.config.ts` |
| Local Prettier | Format this package's source code | `.prettierrc` (JSON, not .ts) |
| Published Prettier | Shared config for consumers | `src/prettier-config.ts` |

The local and published configs should have identical rules. The file formats differ because Prettier CLI and ESLint can't natively load TypeScript configs.

### .prettierignore

Always exclude internal tool configs:

```
node_modules/
dist/
.qwen/
```

Without this, `.qwen/settings.json` (Qwen Code's internal settings) will trigger CI `format:check` failures.

### Delete the Barrel File

Remove `index.ts` and its `main`/`types` exports. Force consumers to use subpath imports (`./eslint`, `./eslint-react`) to avoid loading unnecessary framework plugins.
