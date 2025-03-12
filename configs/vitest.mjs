import vitest from '@vitest/eslint-plugin';

export default [
  {
    files: [ '**/*.test.ts', '**/*.spec.ts', '**/*.test.mts', '**/*.spec.mts', '**/*.test.js', '**/*.spec.js', '**/*.test.mjs', '**/*.spec.mjs' ],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
];
