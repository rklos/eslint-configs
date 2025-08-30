import baseRules from './base.mjs';

export default {
  // Base rules are overridden by some community plugins, so we need to apply them again
  ...baseRules,
};
