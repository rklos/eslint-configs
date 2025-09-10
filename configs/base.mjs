import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import compat from '../utils/compat.mjs';
import baseRules from './rules/base.mjs';

export default [
  js.configs.recommended,
  ...fixupConfigRules(compat.extends('airbnb-base')),
  ...fixupConfigRules(compat.plugins('only-warn')),
  {
    files: [ '**/*.ts', '**/*.mts', '**/*.tsx', '**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx', '**/*.vue', '**/*.svelte', '**/*.svelte.js', '**/*.astro' ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: [ '.ts', '.mts', '.tsx', '.d.ts', '.js', '.cjs', '.mjs', '.jsx', '.vue', '.svelte' ],
        },
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    // Override or add rules here
    rules: {
      ...baseRules,
    },
  },
  {
    files: [ 'eslint.config.js', 'eslint.config.cjs', 'eslint.config.mjs' ],
    rules: {
      'import/no-extraneous-dependencies': 0,
      'import/no-duplicates': 0,
    },
  },
];
