import ts from './typescript.mjs';

export default [
  ...ts,
  {
    files: [ '**/*.ts', '**/*.mts' ],
    rules: {
      'no-useless-constructor': 0,
      'no-empty-function': 0,
      '@typescript-eslint/consistent-type-imports': 0,
    },
  },
];
