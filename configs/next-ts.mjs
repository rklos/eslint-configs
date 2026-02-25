import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import nextConfig from 'eslint-config-next';
import reactTs from './react-ts.mjs';

/**
 * NOTE:
 * To enable full type-aware linting for TypeScript rules (e.g. rules that require type information),
 * you must set `parserOptions.project` in your project's root ESLint config (eslint.config.js):
 *
 *   languageOptions: {
 *     parserOptions: {
 *       project: ['./tsconfig.json'],
 *     },
 *   }
 *
 * This cannot be preconfigured in a shared config due to ESLint's flat config limitations.
 * See: https://typescript-eslint.io/linting/typed-linting/ and ESLint docs.
 *
 * The parser is preconfigured here for Next.js projects, so you do NOT need to set the `parser` option yourself.
 */

// eslint-config-next@16 exports native flat config, no compat layer needed.
// Replace next config's plugin instances with ours to avoid "Cannot redefine plugin" errors.
const ourPlugins = {};
for (const entry of reactTs) {
  if (entry.plugins) {
    Object.assign(ourPlugins, entry.plugins);
  }
}

const nextEntries = nextConfig.map((entry) => {
  if (!entry.plugins) return entry;
  const plugins = { ...entry.plugins };
  for (const key of Object.keys(plugins)) {
    if (ourPlugins[key]) {
      plugins[key] = ourPlugins[key];
    }
  }
  return { ...entry, plugins };
});

export default tsEslint.config({
  extends: [
    ...reactTs,
    ...nextEntries,
  ],

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2020,
      ...globals.node,
      React: 'readonly',
      JSX: 'readonly',
    },
    parser: typescriptEslint,
    parserOptions: {
      parser: typescriptEslint,
      // project: [ './tsconfig.json' ], // <-- cannot be set here, must be set in user's config
    },
  },
});
