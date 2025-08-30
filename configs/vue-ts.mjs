import globals from 'globals';
import vueEslint from 'eslint-plugin-vue';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import base from './base.mjs';
import vueRules from './rules/vue.mjs';

export default tsEslint.config({
  files: [ '**/*.vue' ],

  extends: [
    ...base,
    ...vueEslint.configs['flat/recommended'],
  ],

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2020,
    },
    parser: vueEslint.parser,
    parserOptions: {
      parser: typescriptEslint,
    },
  },

  rules: {
    ...vueRules,
  },
});
