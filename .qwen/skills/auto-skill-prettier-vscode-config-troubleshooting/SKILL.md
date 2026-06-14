---
name: prettier-vscode-config-troubleshooting
description: Diagnose why VS Code Prettier plugin doesn't follow project config (wrong configPath, global overrides, detectIndentation)
source: auto-skill
extracted_at: '2026-06-14T16:00:00.000Z'
---

# Prettier VS Code Plugin — Config Not Applied Troubleshooting

## Symptom

Prettier CLI formats correctly (e.g., `tabWidth: 4`), but **saving in VS Code** reformats with different settings (e.g., 2-space indent).

## Diagnostic Steps

### Step 1: Verify Prettier CLI works

```bash
# Resolve what config Prettier sees for a given file
node -e "const p = require('prettier'); p.resolveConfig('./src/file.ts').then(c => console.log(JSON.stringify(c, null, 2)));"

# Test actual formatting output
printf 'const x = {\na: 1\n}' | npx prettier --stdin-filepath test.ts
```

If CLI output matches `.prettierrc` → Prettier is fine, **the problem is the VS Code plugin**.

### Step 2: Check VS Code global settings

On macOS: `~/Library/Application Support/Code/User/settings.json`

Look for these problematic keys:

| Key | Problem | Fix |
|-----|---------|-----|
| `"prettier.configPath": "prettier.config.js"` | Points to a file that may not exist; Prettier plugin falls back to defaults (2-space indent) | **Delete this key** — let Prettier auto-discover `.prettierrc` |
| `"prettier.tabWidth"` | Global override that may conflict with project config | Remove if project has its own `.prettierrc` |
| Missing `"editor.defaultFormatter"` | VS Code may use built-in formatter instead of Prettier | Set to `"esbenp.prettier-vscode"` |

### Step 3: Check project `.vscode/settings.json`

Ensure the project overrides editor defaults:

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "prettier.useEditorConfig": false
}
```

## Root Causes (ordered by likelihood)

1. **`prettier.configPath` points to wrong/nonexistent file** — most common. The plugin silently falls back to defaults.
2. **`editor.detectIndentation: true` (default)** — VS Code detects existing indentation and overrides Prettier.
3. **No `editor.defaultFormatter`** — VS Code uses its built-in formatter, not Prettier.
4. **`.editorconfig` present** — takes precedence over `.prettierrc` unless `prettier.useEditorConfig: false`.

## Key Insight

`prettier.configPath` is a **VS Code plugin setting** (not a Prettier CLI option). It tells the plugin to use a specific config file path **relative to the workspace root**. If the file doesn't exist, the plugin doesn't error — it just uses defaults. This is the #1 cause of "Prettier CLI works but VS Code save doesn't" issues.
