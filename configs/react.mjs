import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import base from './base.mjs';
import compat from '../utils/compat.mjs';
import reactRules from './rules/react.mjs';

export default [
  ...base,
  ...fixupConfigRules(compat.extends('airbnb')),
  {
    files: [ '**/*.tsx', '**/*.jsx', '**/*.astro' ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        React: 'readonly',
        JSX: 'readonly',
      },
    },

    rules: {
      ...reactRules,
    },
  },
];
