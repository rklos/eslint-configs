import cypress from 'eslint-plugin-cypress/flat';
import base from './base.mjs';

export default [
  ...base,
  cypress.configs.recommended,
];
