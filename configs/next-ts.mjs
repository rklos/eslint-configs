import globals from 'globals';
import tsEslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/parser';
import nextConfig from 'eslint-config-next';
import reactTs from './react-ts.mjs';

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
    },
  },
});
