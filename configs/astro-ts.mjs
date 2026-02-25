import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import astroRules from './rules/astro.mjs';
import ts from './typescript.mjs';

/**
 * NOTE:
 * To enable full type-aware linting for TypeScript rules (e.g. rules that require type information),
 * you must set `parserOptions.project` in your project's root ESLint config (eslint.config.js):
 *
 *   languageOptions: {
 *     parserOptions: {
 *       project: ['./tsconfig.json'],
 *     },
 *   }
 *
 * This cannot be preconfigured in a shared config due to ESLint's flat config limitations.
 * See: https://typescript-eslint.io/linting/typed-linting/ and ESLint docs.
 */

// Extract plugins from ts config so they're available for .astro files.
// Necessary because typescript.mjs scopes plugins to JS/TS files only.
const tsPlugins = {};
for (const entry of ts) {
  if (entry.plugins) {
    Object.assign(tsPlugins, entry.plugins);
  }
}

export default tsEslint.config(
  ...ts,
  ...astro.configs.recommended,
  {
    files: [ '**/*.astro' ],

    plugins: tsPlugins,

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },

    rules: {
      ...astroRules,

      '@typescript-eslint/no-unused-vars': [ 1, { varsIgnorePattern: '^(_.*|Props)$', argsIgnorePattern: '^_' }],
    },
  },
  {
    rules: {
      'import/no-unresolved': [ 1, { ignore: [ '^astro:' ] }],
    },
  },
);
