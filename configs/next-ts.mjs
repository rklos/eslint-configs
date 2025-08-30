import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import nextEslintParser from 'eslint-config-next/parser';
import reactTs from './react-ts.mjs';
import compat from '../utils/compat.mjs';

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
 *
 * The parser is preconfigured here for Next.js projects, so you do NOT need to set the `parser` option yourself.
 */

export default tsEslint.config({
  // No need for a `files` property here; this config is intended for the project root.
  extends: [
    ...reactTs,
    ...fixupConfigRules(compat.extends('next')),
    ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ],

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2020,
      ...globals.node,
      React: 'readonly',
      JSX: 'readonly',
    },
    parser: nextEslintParser,
    parserOptions: {
      parser: typescriptEslint,
      // project: [ './tsconfig.json' ], // <-- cannot be set here, must be set in user's config
    },
  },
});
