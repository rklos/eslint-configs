import { describe, it, expect } from 'vitest';
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

function mergeConfigs(...configs) {
  return configs.flat();
}

const mixedConfigs = [
  {
    name: 'Astro + Svelte',
    configs: [ '../configs/astro.mjs', '../configs/svelte.mjs' ],
    fixtures: [ 'astro.astro', 'svelte.svelte', 'base.js' ],
    typeChecking: false,
  },
  {
    name: 'Astro + Svelte + TS',
    configs: [ '../configs/astro-ts.mjs', '../configs/svelte-ts.mjs' ],
    fixtures: [ 'astro-ts.astro', 'svelte-ts.svelte', 'typescript.ts' ],
    typeChecking: true,
  },
  {
    name: 'Astro + Vue',
    configs: [ '../configs/astro.mjs', '../configs/vue.mjs' ],
    fixtures: [ 'astro.astro', 'vue.vue', 'base.js' ],
    typeChecking: false,
  },
  {
    name: 'Astro + Vue + TS',
    configs: [ '../configs/astro-ts.mjs', '../configs/vue-ts.mjs' ],
    fixtures: [ 'astro-ts.astro', 'vue-ts.vue', 'typescript.ts' ],
    typeChecking: true,
  },
  {
    name: 'Astro + React',
    configs: [ '../configs/astro.mjs', '../configs/react.mjs' ],
    fixtures: [ 'astro.astro', 'react.jsx', 'base.js' ],
    typeChecking: false,
  },
  {
    name: 'Astro + React + TS',
    configs: [ '../configs/astro-ts.mjs', '../configs/react-ts.mjs' ],
    fixtures: [ 'astro-ts.astro', 'react-ts.tsx', 'typescript.ts' ],
    typeChecking: true,
  },
  {
    name: 'React + Jest',
    configs: [ '../configs/react.mjs', '../configs/jest.mjs' ],
    fixtures: [ 'react.jsx', 'jest.test.js' ],
    typeChecking: false,
  },
  {
    name: 'React + TS + Vitest',
    configs: [ '../configs/react-ts.mjs', '../configs/vitest.mjs' ],
    fixtures: [ 'react-ts.tsx', 'vitest.test.js' ],
    typeChecking: true,
  },
  {
    name: 'Next + TS + Cypress',
    configs: [ '../configs/next-ts.mjs', '../configs/cypress.mjs' ],
    fixtures: [ 'next-ts.tsx', 'cypress.cy.ts' ],
    typeChecking: true,
  },
  {
    name: 'Vue + Vitest',
    configs: [ '../configs/vue.mjs', '../configs/vitest.mjs' ],
    fixtures: [ 'vue.vue', 'vitest.test.js' ],
    typeChecking: false,
  },
  {
    name: 'Svelte + Vitest',
    configs: [ '../configs/svelte.mjs', '../configs/vitest.mjs' ],
    fixtures: [ 'svelte.svelte', 'vitest.test.js' ],
    typeChecking: false,
  },
];

describe('Mixed config linting', () => {
  for (const {
    name, configs: configPaths, fixtures, typeChecking, skip, knownFailures = [],
  } of mixedConfigs) {
    const descFn = skip ? describe.skip : describe;
    descFn(`${name}${skip ? ` (SKIPPED: ${skip})` : ''}`, () => {
      let mergedConfig;

      it('should load and merge without errors', async () => {
        const loadedConfigs = await Promise.all(
          configPaths.map(async (p) => {
            const { default: cfg } = await import(p);
            return cfg;
          }),
        );
        mergedConfig = mergeConfigs(...loadedConfigs);
        expect(mergedConfig).toBeDefined();
      });

      for (const fixture of fixtures) {
        const isKnownFailure = knownFailures.includes(fixture);
        const testFn = isKnownFailure ? it.fails : it;

        testFn(`should parse ${fixture} without fatal errors${isKnownFailure ? ' (KNOWN BUG)' : ''}`, async () => {
          if (!mergedConfig) {
            const loadedConfigs = await Promise.all(
              configPaths.map(async (p) => {
                const { default: cfg } = await import(p);
                return cfg;
              }),
            );
            mergedConfig = mergeConfigs(...loadedConfigs);
          }
          const results = await lintFixture(mergedConfig, fixture, { typeChecking });
          assertNoFatalErrors(results);
        });

        testFn(`should produce no severity-2 errors for ${fixture}${isKnownFailure ? ' (KNOWN BUG)' : ''}`, async () => {
          if (!mergedConfig) {
            const loadedConfigs = await Promise.all(
              configPaths.map(async (p) => {
                const { default: cfg } = await import(p);
                return cfg;
              }),
            );
            mergedConfig = mergeConfigs(...loadedConfigs);
          }
          const results = await lintFixture(mergedConfig, fixture, { typeChecking });
          assertNoErrors(results);
        });
      }
    });
  }
});
