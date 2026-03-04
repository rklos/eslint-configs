import cypress from 'eslint-plugin-cypress';
import ts from './typescript.mjs';

export default [
  ...ts,
  cypress.configs.recommended,
];
