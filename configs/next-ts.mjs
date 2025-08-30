import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import nextEslintParser from 'eslint-config-next/parser';
import reactTs from './react-ts.mjs';
import compat from '../utils/compat.mjs';

// const nextConfig = [
//   ...fixupConfigRules(compat.extends('next')),
//   ...fixupConfigRules(compat.extends('next/core-web-vitals')),
// ];

// // Hack: fix for ESLint's "Cannot redefine plugin" error
// /* eslint-disable no-param-reassign */
// nextConfig.forEach((config) => {
//   if (config.plugins?.react) delete config.plugins.react;
//   if (config.plugins?.['jsx-a11y']) delete config.plugins['jsx-a11y'];
// });
// /* eslint-enable no-param-reassign */

export default tsEslint.config({
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
    },
  },
});
