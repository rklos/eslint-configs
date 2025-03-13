import vitest from '@vitest/eslint-plugin';

export default [
  {
    files: [ '**/*.test.ts', '**/*.spec.ts', '**/*.test.mts', '**/*.spec.mts', '**/*.test.tsx', '**/*.spec.tsx', '**/*.test.js', '**/*.spec.js', '**/*.test.mjs', '**/*.spec.mjs', '**/*.test.jsx', '**/*.spec.jsx' ],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
];
