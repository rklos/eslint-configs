import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import astroRules from './rules/astro.mjs';
import base from './base.mjs';
import ts from './typescript.mjs';

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

    extends: [ ...base ],

    plugins: tsPlugins,

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        projectService: true,
        extraFileExtensions: [ '.astro' ],
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
