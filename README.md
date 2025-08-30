# 🧹 My Personal ESLint Configs for Modern Web Development

Welcome! This repository contains **my own curated ESLint ruleset**, designed for a modern JavaScript/TypeScript stack—including React, Nestjs, TypeScript, testing libraries and accessibility best practices.

> **Note:**  
This config **supports only ESLint 9+** and uses the new [flat config format](https://eslint.org/docs/latest/use/configure/configuration-files-new).  
If you're using an older version of ESLint, you will need to upgrade to use these configs.


## ✨ Features

- **My Preferred Rules**: Handpicked and fine-tuned to match my coding style and workflow. Feel free to use it in your own project!
- **Ready for React & TypeScript**: Pre-configured for seamless integration.
- **Accessibility Included**: Sensible defaults for JSX a11y.
- **Based on Airbnb & Community Best Practices**: Enhanced with my personal preferences.

## 🚀 Get Started

1. **Install**:  
   ```sh
   npm install --save-dev rklos/eslint-configs
   ```

   Also install all required peer dependencies based on your tech stack and the configs you use.
   (Check inside each config file to see which dependencies are needed.)

   For example, if you use the React config:
   ```sh
   npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-airbnb
   ```

2. **Configure**:  
   In your `eslint.config.js` (ESLint 9+ [flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new)):
   ```js
   import baseReact from '@rklos/eslint-configs/react';

   export default [
     ...baseReact,
     // You can add your own custom rules or overrides here
   ];
   ```


## ⚙️ TypeScript, React, Next.js, and Vue Support

These configs are designed for **modern TypeScript projects** and include ready-to-use setups for React, Next.js, and Vue.  
**Type-aware linting** (rules that require TypeScript type information) is supported, but requires a small manual step due to ESLint's flat config limitations:

> **To enable full type-aware linting:**  
> In your project’s root `eslint.config.js`, you must set the `parserOptions.project` option to point to your `tsconfig.json`:
>
> ```js
> // eslint.config.js
> export default [
>   // ...your config imports
>   {
>     languageOptions: {
>       parserOptions: {
>         project: ['./tsconfig.json'],
>       },
>     },
>   },
> ];
> ```
>
> This cannot be preconfigured in a shared config—see [typescript-eslint docs](https://typescript-eslint.io/linting/typed-linting/) for details.

### React + TypeScript

- Use the `react` or `react-ts` config for React projects.
- Includes sensible defaults for JSX, accessibility, and React best practices.
- TypeScript parser is preconfigured; just add the `parserOptions.project` override as above for type-aware rules.

### Next.js + TypeScript

- Use the `next-ts` config for Next.js projects.
- The correct parser is already set up for Next.js—**you do not need to set the `parser` option yourself**.
- For type-aware rules, add the `parserOptions.project` override as shown above.

### Vue + TypeScript

- Use the `vue-ts` config for Vue 3 projects with TypeScript.
- The config uses the recommended Vue plugin and TypeScript parser.
- For type-aware rules, add the `parserOptions.project` override as shown above.

> **Tip:**  
> Always check the comments at the top of each config file for the latest usage notes and required peer dependencies.

3. **Enjoy Clean, Consistent Code!**

<br>

---

Feel free to explore, suggest improvements, or use this ruleset as a starting point for your own projects!