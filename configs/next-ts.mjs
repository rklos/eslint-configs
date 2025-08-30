import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
// import nextEslintParser from 'eslint-config-next/parser';
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

const nextConfig = [
  ...fixupConfigRules(compat.extends('next/typescript')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
];

// Hack: fix for ESLint's "Cannot redefine plugin" error
/* eslint-disable no-param-reassign */
nextConfig.forEach((config) => {
  if (config.plugins?.['@typescript-eslint']) delete config.plugins['@typescript-eslint'];
  // if (config.plugins?.react) delete config.plugins.react;
  // if (config.plugins?.['jsx-a11y']) delete config.plugins['jsx-a11y'];
});
/* eslint-enable no-param-reassign */

export default tsEslint.config({
  // No need for a `files` property here; this config is intended for the project root.
  extends: [
    ...reactTs,
    ...nextConfig,
  ],

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2020,
      ...globals.node,
      React: 'readonly',
      JSX: 'readonly',
    },
    parser: typescriptEslint,
    // parser: nextEslintParser,
    parserOptions: {
      parser: typescriptEslint,
      // project: [ './tsconfig.json' ], // <-- cannot be set here, must be set in user's config
    },
  },
});
