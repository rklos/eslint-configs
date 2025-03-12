import base from './base.mjs';

export default [
  ...base,
  {
    files: [ '**/*.ts', '**/*.mts' ],
    rules: {
      'no-useless-constructor': 0,
      'no-empty-function': 0,
      '@typescript-eslint/consistent-type-imports': 0,
    },
  },
];
