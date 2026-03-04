import globals from 'globals';
import vueEslint from 'eslint-plugin-vue';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import ts from './typescript.mjs';
import vueRules from './rules/vue.mjs';

export default tsEslint.config(
  ...ts,
  {
    files: [ '**/*.vue' ],

    extends: [
      ...ts,
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
        extraFileExtensions: [ '.vue' ],
      },
    },

    rules: {
      ...vueRules,
    },
  },
);
