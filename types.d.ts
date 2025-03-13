import type { ConfigArray } from 'typescript-eslint';

// Define a single module declaration with a wildcard pattern
declare module '@rklos/eslint-config/*' {
  const config: ConfigArray;
  export default config;
}

// Also declare the base package
declare module '@rklos/eslint-config' {
  const config: ConfigArray;
  export default config;
}
