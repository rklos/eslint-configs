import base from './configs/base.mjs';

export default [
  ...base,
  {
    files: [ 'tests/**/*.test.mjs' ],
    rules: {
      'no-restricted-syntax': 0,
      'no-underscore-dangle': 0,
    },
  },
];
