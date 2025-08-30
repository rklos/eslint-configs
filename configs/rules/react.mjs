export default {
  'react/destructuring-assignment': 0,
  'react/react-in-jsx-scope': 0,
  'react/jsx-one-expression-per-line': 0,
  'react/require-default-props': 0,
  'react/jsx-props-no-spreading': 0,
  // ???
  // 'react/jsx-uses-react': 0,
  // ???
  // 'react/no-array-index-key': 0,
  'jsx-a11y/control-has-associated-label': 0,
  // Doesn't work: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/511
  'jsx-a11y/label-has-associated-control': 0,
  'jsx-a11y/no-static-element-interactions': 0,
  'jsx-a11y/click-events-have-key-events': 0,

  // Following rules are my preferences, but they are not part of the recommended rules of the React community
  // 'react/jsx-first-prop-new-line': [ 1, 'never' ],
  // 'react/jsx-closing-bracket-location': [ 1, 'after-props' ],
  // 'react/jsx-indent-props': [ 1, 'first' ],
  // 'react/jsx-curly-spacing': [ 1, { when: 'always', children: true, spacing: { objectLiterals: 'never' } }],

  'react/jsx-filename-extension': [ 1, { extensions: [ '.jsx', '.tsx' ] }],
};
