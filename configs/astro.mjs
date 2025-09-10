import globals from 'globals';
import astro from 'eslint-plugin-astro';
import base from './base.mjs';
import astroRules from './rules/astro.mjs';

export default [
  ...base,
  ...astro.configs.recommended,
  {
    files: [ '**/*.astro' ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },

    rules: {
      ...astroRules,
    },
  },
];
