import globals from 'globals';
import svelte from 'eslint-plugin-svelte';
import base from './base.mjs';
import svelteRules from './rules/svelte.mjs';

export default [
  ...base,
  ...svelte.configs.recommended,
  {
    files: [ '**/*.svelte', '**/*.svelte.js', '**/*.astro' ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },

    rules: {
      ...svelteRules,
    },
  },
];
