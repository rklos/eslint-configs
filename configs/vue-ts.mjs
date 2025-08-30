import globals from 'globals';
import vueEslint from 'eslint-plugin-vue';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import base from './base.mjs';
import vueRules from './rules/vue.mjs';

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
 */

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
      // project: [ './tsconfig.json' ], // <-- cannot be set here, must be set in user's config
      extraFileExtensions: [ '.vue' ],
    },
  },

  rules: {
    ...vueRules,
  },
});
