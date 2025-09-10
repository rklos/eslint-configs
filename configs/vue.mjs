import globals from 'globals';
import vueEslint from 'eslint-plugin-vue';
import base from './base.mjs';
import vueRules from './rules/vue.mjs';

export default [
  ...base,
  ...vueEslint.configs['flat/recommended'],
  {
    files: [ '**/*.vue', '**/*.astro' ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },

    rules: {
      ...vueRules,
    },
  },
];
