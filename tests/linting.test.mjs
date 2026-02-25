import { describe, it } from 'vitest';
import { ESLint } from 'eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, 'fixtures');

// Ignores *.svelte because svelte-ts uses projectService which conflicts with project
const typeCheckingConfig = {
  ignores: [ '**/*.svelte', '**/*.svelte.js', '**/*.svelte.ts' ],
  languageOptions: {
    parserOptions: {
      project: path.join(__dirname, 'tsconfig.json'),
      extraFileExtensions: [ '.vue', '.astro' ],
    },
  },
};

// Suppress @next/next/no-html-link-for-pages which requires a pages/ directory
const suppressNextPagesRule = {
  rules: { '@next/next/no-html-link-for-pages': 0 },
};

async function lintFixture(config, fixtureName, { typeChecking = false } = {}) {
  const finalConfig = typeChecking
    ? [ ...config, typeCheckingConfig, suppressNextPagesRule ]
    : [ ...config, suppressNextPagesRule ];
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: finalConfig,
    cwd: path.join(__dirname),
  });
  const results = await eslint.lintFiles([ path.join(fixturesDir, fixtureName) ]);
  return results;
}

function assertNoFatalErrors(results) {
  for (const result of results) {
    const fatals = result.messages.filter((m) => m.fatal);
    if (fatals.length > 0) {
      const details = fatals.map((m) => `  Line ${m.line}: ${m.message}`).join('\n');
      throw new Error(`Fatal parsing errors in ${result.filePath}:\n${details}`);
    }
  }
}

function assertNoErrors(results) {
  for (const result of results) {
    const errors = result.messages.filter((m) => m.severity === 2);
    if (errors.length > 0) {
      const details = errors.map((m) => `  ${m.ruleId}: ${m.message} (line ${m.line})`).join('\n');
      throw new Error(`Unexpected errors (severity 2) in ${result.filePath}:\n${details}`);
    }
  }
}

const configs = [
  {
    name: 'base',
    configPath: '../configs/base.mjs',
    fixture: 'base.js',
    extendsBase: true,
  },
  {
    name: 'typescript',
    configPath: '../configs/typescript.mjs',
    fixture: 'typescript.ts',
    extendsBase: true,
    typeChecking: true,
  },
  {
    name: 'react',
    configPath: '../configs/react.mjs',
    fixture: 'react.jsx',
    extendsBase: true,
  },
  {
    name: 'react-ts',
    configPath: '../configs/react-ts.mjs',
    fixture: 'react-ts.tsx',
    extendsBase: true,
    typeChecking: true,
  },
  {
    name: 'next',
    configPath: '../configs/next.mjs',
    fixture: 'next.jsx',
    extendsBase: true,
  },
  {
    name: 'next-ts',
    configPath: '../configs/next-ts.mjs',
    fixture: 'next-ts.tsx',
    extendsBase: true,
    typeChecking: true,
  },
  {
    name: 'vue',
    configPath: '../configs/vue.mjs',
    fixture: 'vue.vue',
    extendsBase: true,
  },
  {
    name: 'vue-ts',
    configPath: '../configs/vue-ts.mjs',
    fixture: 'vue-ts.vue',
    extendsBase: true,
    typeChecking: true,
  },
  {
    name: 'svelte',
    configPath: '../configs/svelte.mjs',
    fixture: 'svelte.svelte',
    extendsBase: true,
  },
  {
    name: 'svelte-ts',
    configPath: '../configs/svelte-ts.mjs',
    fixture: 'svelte-ts.svelte',
    extendsBase: true,
  },
  {
    name: 'astro',
    configPath: '../configs/astro.mjs',
    fixture: 'astro.astro',
    extendsBase: true,
  },
  {
    name: 'astro-ts',
    configPath: '../configs/astro-ts.mjs',
    fixture: 'astro-ts.astro',
    extendsBase: true,
    typeChecking: true,
  },
  {
    name: 'jest',
    configPath: '../configs/jest.mjs',
    fixture: 'jest.test.js',
  },
  {
    name: 'vitest',
    configPath: '../configs/vitest.mjs',
    fixture: 'vitest.test.js',
  },
  {
    name: 'cypress',
    configPath: '../configs/cypress.mjs',
    fixture: 'cypress.cy.ts',
    extendsBase: true,
    typeChecking: true,
  },
  {
    name: 'nest',
    configPath: '../configs/nest.mjs',
    fixture: 'nest.ts',
    extendsBase: true,
    typeChecking: true,
  },
];

describe('Single config linting', () => {
  for (const {
    name, configPath, fixture, extendsBase, typeChecking, skip,
  } of configs) {
    const descFn = skip ? describe.skip : describe;
    descFn(`${name}${skip ? ` (SKIPPED: ${skip})` : ''}`, () => {
      it(`should load and parse ${fixture} without fatal errors`, async () => {
        const { default: config } = await import(configPath);
        const results = await lintFixture(config, fixture, { typeChecking });
        assertNoFatalErrors(results);
      });

      if (extendsBase) {
        it(`should produce only warnings (no severity-2 errors) for ${fixture}`, async () => {
          const { default: config } = await import(configPath);
          const results = await lintFixture(config, fixture, { typeChecking });
          assertNoErrors(results);
        });
      }
    });
  }
});
