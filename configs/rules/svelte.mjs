import baseRules from './base.mjs';

export default {
  // Base rules are overridden by some community plugins, so we need to apply them again
  ...baseRules,
  'prefer-const': 0,

  'svelte/infinite-reactive-loop': 1,
  'svelte/no-dom-manipulating': 1,
  'svelte/no-dupe-on-directives': 1,
  'svelte/no-dupe-use-directives': 1,
  'svelte/no-export-load-in-svelte-module-in-kit-pages': 1,
  'svelte/no-store-async': 1,
  'svelte/require-store-callbacks-use-set-param': 1,
  'svelte/require-store-reactive-access': 1,
  'svelte/valid-prop-names-in-kit-pages': 1,
  'svelte/no-at-html-tags': 0,
  'svelte/no-target-blank': 1,
  'svelte/block-lang': [ 1, {
    style: 'scss',
  }],
  'svelte/button-has-type': 1,
  'svelte/no-reactive-functions': 1,
  'svelte/no-reactive-literals': 1,
  'svelte/no-useless-mustaches': 1,
  'svelte/prefer-destructured-store-props': 1,
  'svelte/require-event-dispatcher-types': 1,
  'svelte/require-optimized-style-attribute': 1,
  'svelte/require-stores-init': 1,
  'svelte/derived-has-same-inputs-outputs': 1,
  'svelte/first-attribute-linebreak': [ 1, {
    multiline: 'beside',
  }],
  'svelte/html-closing-bracket-spacing': 1,
  'svelte/html-quotes': 1,
  'svelte/html-self-closing': 1,
  'svelte/indent': [ 1, {
    alignAttributesVertically: true,
  }],
  'svelte/max-attributes-per-line': [ 1, {
    singleline: 2,
  }],
  // 'svelte/mustache-spacing': [ 1, {
  //   textExpressions: 'always',
  //   attributesAndProps: 'always',
  //   directiveExpressions: 'always',

  //   tags: {
  //     openingBrace: 'always',
  //     closingBrace: 'always',
  //   },
  // }],
  'svelte/no-extra-reactive-curlies': 0,
  'svelte/no-spaces-around-equal-signs-in-attribute': 1,
  'svelte/prefer-class-directive': 1,
  'svelte/prefer-style-directive': 1,
  'svelte/shorthand-attribute': 1,
  'svelte/shorthand-directive': 1,
  'svelte/spaced-html-comment': 1,
  'svelte/no-trailing-spaces': 1,
};
