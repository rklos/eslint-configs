import { fixupConfigRules } from '@eslint/compat';
import react from './react.mjs';
import compat from '../utils/compat.mjs';

// const nextConfig = [
//   ...fixupConfigRules(compat.extends('next')),
//   ...fixupConfigRules(compat.extends('next/core-web-vitals')),
// ];

// // Hack: fix for ESLint's "Cannot redefine plugin" error
// /* eslint-disable no-param-reassign */
// nextConfig.forEach((config) => {
//   if (config.plugins?.react) delete config.plugins.react;
//   if (config.plugins?.['jsx-a11y']) delete config.plugins['jsx-a11y'];
// });
// /* eslint-enable no-param-reassign */

// TODO: fix the following error:
// Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires type information, but don't have parserOptions set to generate type information for this file. See https://typescript-eslint.io/getting-started/typed-linting for enabling linting with type information.
// Parser: eslint-config-next/parser
// Note: detected a parser other than @typescript-eslint/parser. Make sure the parser is configured to forward "parserOptions.project" to @typescript-eslint/parser.
// Occurred while linting /.../.../.../some-file.tsx

export default [
  ...react,
  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
];
