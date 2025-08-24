import tseslint from 'typescript-eslint';
import base from './base.mjs';

export default tseslint.config(
  ...base,
  tseslint.configs.recommendedTypeChecked,
  {
    files: [ '**/*.ts', '**/*.mts', '**/*.tsx', '**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx', '**/*.vue', '**/*.svelte' ],
    // Override or add rules here
    rules: {
      '@typescript-eslint/consistent-type-definitions': [ 1, 'interface' ],
      '@typescript-eslint/consistent-type-imports': 1,
      '@typescript-eslint/no-unused-vars': [ 1, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-member-accessibility': 1,
    },
  },
);
