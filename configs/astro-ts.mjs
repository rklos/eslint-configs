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

export default tsEslint.config(
  ...ts,
  {
    files: [ '**/*.astro' ],

    extends: [
      ...ts,
      ...astro.configs.recommended,
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        projectService: true,
        parser: typescriptEslint,
        // project: [ './tsconfig.json' ], // <-- cannot be set here, must be set in user's config
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
