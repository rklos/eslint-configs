# @rklos/eslint-config

My personal ESLint configs for modern web development. Opinionated, based on Airbnb with my own tweaks.

Supports **ESLint 9+ and 10** with [flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) only. Requires **Node.js >= 20.12.0** (ESLint 10's stylish formatter uses `util.styleText` which was added in Node 20.12.0).

## Available configs

| Config | Import path | Includes |
|--------|-------------|----------|
| Base (JS) | `@rklos/eslint-config/base` | Airbnb base, stylistic rules |
| TypeScript | `@rklos/eslint-config/typescript` | Base + typescript-eslint |
| React | `@rklos/eslint-config/react` | Base + React, JSX a11y |
| React + TS | `@rklos/eslint-config/react-ts` | TypeScript + React, JSX a11y |
| Next.js | `@rklos/eslint-config/next` | React + eslint-config-next |
| Next.js + TS | `@rklos/eslint-config/next-ts` | React TS + eslint-config-next |
| Vue | `@rklos/eslint-config/vue` | Base + Vue plugin |
| Vue + TS | `@rklos/eslint-config/vue-ts` | TypeScript + Vue plugin |
| Svelte | `@rklos/eslint-config/svelte` | Base + Svelte plugin |
| Svelte + TS | `@rklos/eslint-config/svelte-ts` | TypeScript + Svelte plugin |
| Astro | `@rklos/eslint-config/astro` | Base + Astro plugin |
| Astro + TS | `@rklos/eslint-config/astro-ts` | TypeScript + Astro plugin |
| Jest | `@rklos/eslint-config/jest` | Jest plugin (standalone) |
| Vitest | `@rklos/eslint-config/vitest` | Vitest plugin (standalone) |
| Cypress | `@rklos/eslint-config/cypress` | TypeScript + Cypress plugin |
| NestJS | `@rklos/eslint-config/nest` | TypeScript |

## Usage

### Basic setup

```js
// eslint.config.js
import react from '@rklos/eslint-config/react';

export default [
  ...react,
];
```

### TypeScript with type-aware linting

All `-ts` configs include typescript-eslint's type-checked rules. For these to work you need to point to your `tsconfig.json`:

```js
// eslint.config.js
import reactTs from '@rklos/eslint-config/react-ts';

export default [
  ...reactTs,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
];
```

This is required because ESLint's flat config doesn't allow shared configs to resolve project-relative tsconfig paths. See [typescript-eslint docs](https://typescript-eslint.io/linting/typed-linting/) for details.

### Combining multiple configs

Configs can be spread together. For example, an Astro project with React and TypeScript:

```js
// eslint.config.js
import astroTs from '@rklos/eslint-config/astro-ts';
import reactTs from '@rklos/eslint-config/react-ts';
import vitest from '@rklos/eslint-config/vitest';

export default [
  ...astroTs,
  ...reactTs,
  ...vitest,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
];
```

---

## Config details

Install `@rklos/eslint-config` and `eslint` first, then add the peer dependencies for the configs you use.

```sh
npm install --save-dev @rklos/eslint-config eslint
```

### Base

```sh
npm install --save-dev eslint-import-resolver-typescript
```

```js
import base from '@rklos/eslint-config/base';

export default [...base];
```

### TypeScript

```sh
npm install --save-dev eslint-import-resolver-typescript typescript typescript-eslint
```

```js
import typescript from '@rklos/eslint-config/typescript';

export default [...typescript];
```

### React

```sh
npm install --save-dev eslint-import-resolver-typescript eslint-config-airbnb eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

```js
import react from '@rklos/eslint-config/react';

export default [...react];
```

### React + TypeScript

```sh
npm install --save-dev eslint-import-resolver-typescript typescript typescript-eslint @typescript-eslint/parser eslint-config-airbnb eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

```js
import reactTs from '@rklos/eslint-config/react-ts';

export default [...reactTs];
```

### Next.js

```sh
npm install --save-dev eslint-import-resolver-typescript eslint-config-airbnb eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-next @next/eslint-plugin-next
```

```js
import next from '@rklos/eslint-config/next';

export default [...next];
```

### Next.js + TypeScript

```sh
npm install --save-dev eslint-import-resolver-typescript typescript typescript-eslint @typescript-eslint/parser eslint-config-airbnb eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-next @next/eslint-plugin-next
```

```js
import nextTs from '@rklos/eslint-config/next-ts';

export default [...nextTs];
```

### Vue

```sh
npm install --save-dev eslint-import-resolver-typescript eslint-plugin-vue
```

```js
import vue from '@rklos/eslint-config/vue';

export default [...vue];
```

### Vue + TypeScript

```sh
npm install --save-dev eslint-import-resolver-typescript typescript typescript-eslint @typescript-eslint/parser eslint-plugin-vue vue-eslint-parser
```

```js
import vueTs from '@rklos/eslint-config/vue-ts';

export default [...vueTs];
```

### Svelte

```sh
npm install --save-dev eslint-import-resolver-typescript eslint-plugin-svelte
```

```js
import svelte from '@rklos/eslint-config/svelte';

export default [...svelte];
```

### Svelte + TypeScript

```sh
npm install --save-dev eslint-import-resolver-typescript typescript typescript-eslint @typescript-eslint/parser eslint-plugin-svelte
```

```js
import svelteTs from '@rklos/eslint-config/svelte-ts';

export default [...svelteTs];
```

### Astro

```sh
npm install --save-dev eslint-import-resolver-typescript eslint-plugin-astro
```

```js
import astro from '@rklos/eslint-config/astro';

export default [...astro];
```

### Astro + TypeScript

```sh
npm install --save-dev eslint-import-resolver-typescript typescript typescript-eslint @typescript-eslint/parser eslint-plugin-astro
```

```js
import astroTs from '@rklos/eslint-config/astro-ts';

export default [...astroTs];
```

### Jest

Standalone — combine with any other config.

```sh
npm install --save-dev eslint-plugin-jest
```

```js
import jest from '@rklos/eslint-config/jest';

export default [...jest];
```

### Vitest

Standalone — combine with any other config.

```sh
npm install --save-dev @vitest/eslint-plugin
```

```js
import vitest from '@rklos/eslint-config/vitest';

export default [...vitest];
```

### Cypress

```sh
npm install --save-dev eslint-import-resolver-typescript typescript typescript-eslint eslint-plugin-cypress
```

```js
import cypress from '@rklos/eslint-config/cypress';

export default [
  ...cypress,
  {
    languageOptions: {
      parserOptions: { project: ['./tsconfig.json'] },
    },
  },
];
```

### NestJS

```sh
npm install --save-dev eslint-import-resolver-typescript typescript typescript-eslint
```

```js
import nest from '@rklos/eslint-config/nest';

export default [
  ...nest,
  {
    languageOptions: {
      parserOptions: { project: ['./tsconfig.json'] },
    },
  },
];
```

## License

MIT
