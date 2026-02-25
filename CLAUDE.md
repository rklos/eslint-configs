# CLAUDE.md

## Project overview

Shared ESLint flat configs (`@rklos/eslint-config`). Supports ESLint 9+ and 10. 16 configs covering base JS, TypeScript, React, Next.js, Vue, Svelte, Astro, Jest, Vitest, Cypress, and NestJS.

## Commands

- `yarn vitest run` — run all tests
- `yarn vitest run tests/<file>.test.mjs` — run a specific test file
- `yarn vitest run --update` — run tests and update snapshots

## Project structure

- `configs/` — ESLint config files (`.mjs`), one per stack variant
- `configs/rules/` — rule definition files, grouped by concern (base, react, vue, svelte, astro)
- `utils/compat.mjs` — compat layer for legacy eslint plugins
- `tests/` — test files
- `tests/fixtures/` — minimal source files for each config to lint against
- `tests/__snapshots__/` — vitest snapshots of config structures

## Architecture decisions

- `typescript.mjs` file patterns are limited to JS/TS files only (`**/*.ts`, `**/*.mts`, `**/*.tsx`, `**/*.js`, `**/*.cjs`, `**/*.mjs`, `**/*.jsx`). Framework extensions (`.vue`, `.svelte`, `.astro`) are excluded to prevent parser conflicts when combining multiple `-ts` configs.
- Framework `-ts` configs (astro-ts, svelte-ts, vue-ts) use `extends` or extract `tsPlugins` from the `ts` config to apply TypeScript rules to their specific file types without overriding framework parsers.
- `svelte-ts` uses `projectService: true` which conflicts with `parserOptions.project`. Tests add `ignores: ['**/*.svelte', '**/*.svelte.js', '**/*.svelte.ts']` to the `typeCheckingConfig` to avoid this.
- `eslint-config-next`'s babel parser doesn't support ESLint 10's `scopeManager.addGlobals`. `next.mjs` detects and removes it so ESLint falls back to espree.

## Maintaining configs

### Adding a new config

1. Create `configs/<name>.mjs` — extend `base` (JS) or `typescript` (TS variant).
2. Create `configs/rules/<name>.mjs` if the config has custom rules beyond the plugin defaults.
3. Add an export entry in `package.json` under `exports`.
4. Add required peer dependencies to `peerDependencies` in `package.json`.
5. Create a test fixture in `tests/fixtures/`.
6. Add the config to the `configs` array in `tests/linting.test.mjs`.
7. Add relevant mixed config combinations to `tests/mixed.test.mjs` (see below).
8. Run `yarn vitest run --update` to generate the snapshot.
9. Update README.md: add a row to the configs table with the import path and required peer deps.

### Modifying an existing config

1. After changes, run `yarn vitest run` to check for breakage.
2. If the config structure changed (new plugins, rules, entries), update the snapshot with `--update`.
3. If file patterns or parser setup changed, pay attention to regression tests — parser conflicts between combined configs are the most common issue.

## Maintaining tests

### Test files

- `tests/linting.test.mjs` — loads each config individually, lints its fixture, asserts no fatal errors and no severity-2 errors.
- `tests/mixed.test.mjs` — loads combinations of configs that users would realistically use together, asserts no fatal/error issues. **When adding a new config, think about which existing configs it could be combined with and add those combos here.**
- `tests/regressions.test.mjs` — targeted tests for specific bugs that were fixed. **Every bug fix should have a regression test proving the bug existed and is now fixed.**
- `tests/snapshots.test.mjs` — snapshot tests of config structure (plugins, rules, parser, file patterns).

### Mixed test combinations to consider

When deciding which combinations to test, consider what a real project would use:
- Framework configs are combined with each other when a project supports multiple (e.g. Astro + React, Astro + Svelte, Astro + Vue).
- Framework configs are combined with test runner configs (e.g. React + Jest, Vue + Vitest).
- Both `-ts` and non-TS variants of combinations should be tested.
- Order matters — test both `[...configA, ...configB]` and reversed if parser conflicts are a concern.

### Regression tests

When fixing a bug:
1. Write a test that reproduces the bug first (it should fail before the fix).
2. Apply the fix.
3. Confirm the test passes.
4. Keep the test permanently in `tests/regressions.test.mjs`.
5. Use `it.fails('description', ...)` for known bugs that are not yet fixed — this documents the bug and will alert when it gets fixed unexpectedly.

### Test infrastructure notes

- `typeCheckingConfig` in test files adds `parserOptions.project` for type-aware linting. It ignores `.svelte` files due to `projectService` conflict.
- `suppressNextPagesRule` disables `@next/next/no-html-link-for-pages` in tests since there's no `pages/` directory in the test environment.
- Fixtures should be minimal — just enough code to exercise the parser and rules without triggering errors.

## Maintaining the README

- The configs table must list all available configs with their import path, what they include, and the full list of **peer dependencies** the user needs to install.
- Peer deps are packages listed in `peerDependencies` in `package.json`. Packages in `dependencies` are bundled and users don't install them.
- When adding/removing a config or changing its dependencies, update both `package.json` (exports + peerDependencies) and the README table.

## Code style

- All config files use `.mjs` extension with ES module imports.
- ESLint rule severity: use `0` (off), `1` (warn), `2` (error) — numeric, not string.
- Array formatting: spaces inside brackets `[ 'foo', 'bar' ]`.
- All warnings, no errors — the `eslint-plugin-only-warn` plugin downgrades all errors to warnings. The configs themselves should use severity `1` for rules they enable.
