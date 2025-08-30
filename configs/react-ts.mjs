import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import ts from './typescript.mjs';
import compat from '../utils/compat.mjs';
import reactRules from './rules/react.mjs';

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

export default tsEslint.config({
  files: [ '**/*.tsx', '**/*.jsx' ],

  extends: [
    ...ts,
    ...fixupConfigRules(compat.extends('airbnb')),
  ],

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2020,
      React: 'readonly',
      JSX: 'readonly',
    },
    parser: typescriptEslint,
    // project: [ './tsconfig.json' ], // <-- cannot be set here, must be set in user's config
  },

  rules: {
    ...reactRules,
  },
});
