/**
 * These rules are somehow overriden by the community rules, so we need to apply them once again in the end of problematic config files.
 */

export default {
  'import/extensions': [ 1, 'ignorePackages', {
    ts: 'never',
    mts: 'never',
    tsx: 'never',
    js: 'always',
    cjs: 'always',
    mjs: 'always',
    jsx: 'never',
    vue: 'always',
    svelte: 'always',

    svg: 'always',
    json: 'always',
  }],
};
