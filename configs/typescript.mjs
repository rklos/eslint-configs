import tsEslint from 'typescript-eslint';
import base from './base.mjs';

export default tsEslint.config(
  {
    files: [ '**/*.ts', '**/*.mts', '**/*.tsx', '**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx', '**/*.vue', '**/*.svelte', '**/*.astro' ],

    extends: [
      ...base,
      ...tsEslint.configs.recommendedTypeChecked,
    ],

    rules: {
      '@typescript-eslint/consistent-type-definitions': [ 1, 'interface' ],
      '@typescript-eslint/consistent-type-imports': 1,
      '@typescript-eslint/no-unused-vars': [ 1, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-member-accessibility': 1,
    },
  },
);
