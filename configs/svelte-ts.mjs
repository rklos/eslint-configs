import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import svelteRules from './rules/svelte.mjs';
import ts from './typescript.mjs';

export default tsEslint.config(
  ...ts,
  {
    files: [ '**/*.svelte', '**/*.svelte.js', '**/*.svelte.ts' ],

    extends: [
      ...ts,
      ...svelte.configs.recommended,
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        project: true,
        parser: typescriptEslint,
        extraFileExtensions: [ '.svelte' ],
      },
    },

    rules: {
      ...svelteRules,

      'svelte/block-lang': [ 1, {
        script: 'ts',
        style: 'scss',
      }],
    },
  },
);
