export default {
  indent: 0,
  'no-unused-vars': 0,
  'no-await-in-loop': 0,
  'no-plusplus': 0,
  'class-methods-use-this': 0,
  'array-bracket-spacing': 0,
  'max-len': 0,
  'import/prefer-default-export': 0,

  'object-curly-newline': [ 1, { multiline: true, minProperties: 5, consistent: true }],
  'lines-between-class-members': [ 1, 'always', { exceptAfterSingleLine: true }],

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

  // ???
  'import/no-extraneous-dependencies': [ 1, { devDependencies: true }],

  '@stylistic/indent': [ 1, 2 ],
  '@stylistic/max-len': [ 1, {
    code: 120,
    comments: 150,
    ignoreStrings: true,
  }],
  '@stylistic/array-bracket-spacing': [ 1, 'always', {
    arraysInArrays: false,
    objectsInArrays: false,
  }],
  '@stylistic/member-delimiter-style': 1,
  '@stylistic/type-annotation-spacing': 1,
  '@stylistic/lines-between-class-members': [ 1, { enforce: [{ blankLine: 'always', prev: 'method', next: 'method' }] }],
};
