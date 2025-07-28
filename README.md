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

3. **Enjoy Clean, Consistent Code!**

<br>

---

Feel free to explore, suggest improvements, or use this ruleset as a starting point for your own projects!