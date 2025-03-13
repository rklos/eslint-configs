import globals from 'globals';
import jest from 'eslint-plugin-jest';

export default [
  {
    files: [ '**/*.test.ts', '**/*.spec.ts', '**/*.test.mts', '**/*.spec.mts', '**/*.test.tsx', '**/*.spec.tsx', '**/*.test.js', '**/*.spec.js', '**/*.test.mjs', '**/*.spec.mjs', '**/*.test.jsx', '**/*.spec.jsx' ],
    ...jest.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: [ '**/*.test.ts', '**/*.spec.ts', '**/*.test.mts', '**/*.spec.mts', '**/*.test.tsx', '**/*.spec.tsx', '**/*.test.js', '**/*.spec.js', '**/*.test.mjs', '**/*.spec.mjs', '**/*.test.jsx', '**/*.spec.jsx' ],
    rules: {
      'consistent-return': 0,
    },
  },
];
