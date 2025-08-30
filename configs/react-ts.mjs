import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import ts from './typescript.mjs';
import compat from '../utils/compat.mjs';
import reactRules from './rules/react.mjs';

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
  },

  rules: {
    ...reactRules,
  },
});
