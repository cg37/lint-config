---
name: eslint-flat-config-array-nesting
description: Fix ESLint "Unexpected array" error caused by nested config arrays in shared config packages
source: auto-skill
extracted_at: '2026-06-15T16:05:02.154Z'
---

# ESLint Flat Config: Avoid Nested Arrays

## Symptom

Consumer of a shared ESLint config package gets:

```
TypeError: Unexpected array.
    at flatTraverse (@eslint/config-array/dist/cjs/index.cjs:567:12)
```

## Root Cause

Many ESLint plugin config exports are **arrays**, not objects. When placed inside a `defineConfig([...])` or exported array, they create nested arrays that ESLint's `flatTraverse` cannot handle.

Common offenders:
- `tseslint.configs.recommended` — is an array of config objects
- `pluginVue.configs["flat/essential"]` — is an array of config objects
- `js.configs.recommended` — is a single object (safe)

## Fix

Always **spread** array-valued plugin configs:

```diff
 export default defineConfig([
     js.configs.recommended,
-    tseslint.configs.recommended,
+    ...tseslint.configs.recommended,
     prettierRecommended,
     // ...
 ]);
```

```diff
 export default [
     ...baseConfig,
-    pluginVue.configs["flat/essential"],
+    ...pluginVue.configs["flat/essential"],
     // ...
 ];
```

## Verification

After building, check for nested arrays:

```bash
node -e "
import cfg from './dist/src/eslint.config.js';
console.log('hasNestedArray:', cfg.some(x => Array.isArray(x)));
"
```

The result should be `false`.

## Key Takeaway

When building a shared ESLint config package, **every** plugin config value that is array-valued must be spread (`...`) into the outer config array. Do not assume a plugin config is a single object — verify with `Array.isArray()` at development time.
