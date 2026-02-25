import globals from 'globals';
import nextConfig from 'eslint-config-next';
import react from './react.mjs';

// eslint-config-next@16 exports native flat config, no compat layer needed.
const ourPlugins = {};
for (const entry of react) {
  if (entry.plugins) {
    Object.assign(ourPlugins, entry.plugins);
  }
}

const nextEntries = nextConfig.map((entry) => {
  const patched = { ...entry };

  // Replace next config's plugin instances with ours to avoid "Cannot redefine plugin" errors.
  if (patched.plugins) {
    const plugins = { ...patched.plugins };
    for (const key of Object.keys(plugins)) {
      if (ourPlugins[key]) {
        plugins[key] = ourPlugins[key];
      }
    }
    patched.plugins = plugins;
  }

  // eslint-config-next/parser (babel-based) doesn't implement scopeManager.addGlobals
  // required by ESLint 10. Remove it so ESLint falls back to espree for JS/JSX files.
  if (patched.languageOptions?.parser?.meta?.name === 'eslint-config-next/parser') {
    patched.languageOptions = { ...patched.languageOptions };
    delete patched.languageOptions.parser;
  }

  return patched;
});

export default [
  ...react,
  ...nextEntries,
  {
    files: [ '**/*.tsx', '**/*.jsx' ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        React: 'readonly',
        JSX: 'readonly',
      },
    },
  },
];
