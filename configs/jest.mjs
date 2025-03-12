import globals from 'globals';
import jest from 'eslint-plugin-jest';

export default [
  {
    files: [ '**/*.test.ts', '**/*.spec.ts', '**/*.test.mts', '**/*.spec.mts', '**/*.test.js', '**/*.spec.js', '**/*.test.mjs', '**/*.spec.mjs' ],
    ...jest.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: [ '**/*.test.ts', '**/*.spec.ts', '**/*.test.mts', '**/*.spec.mts', '**/*.test.js', '**/*.spec.js', '**/*.test.mjs', '**/*.spec.mjs' ],
    rules: {
      'consistent-return': 0,
    },
  },
];
