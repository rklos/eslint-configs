import cypress from 'eslint-plugin-cypress/flat';
import ts from './typescript.mjs';

export default [
  ...ts,
  cypress.configs.recommended,
];
