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

function getFatalErrors(results) {
  return results.flatMap((r) => r.messages.filter((m) => m.fatal).map((m) => ({
    file: r.filePath,
    line: m.line,
    message: m.message,
  })));
}

function getRuleViolations(results, ruleId) {
  return results.flatMap((r) => r.messages.filter((m) => m.ruleId === ruleId).map((m) => ({
    file: r.filePath,
    line: m.line,
    message: m.message,
    severity: m.severity,
  })));
}

describe('Regression: Astro + Svelte parser conflicts', () => {
  let astroConfig;
  let svelteConfig;

  it('should load both configs', async () => {
    const { default: a } = await import('../configs/astro.mjs');
    const { default: s } = await import('../configs/svelte.mjs');
    astroConfig = a;
    svelteConfig = s;
  });

  it('should parse .svelte files without fatal errors when combined with astro config', async () => {
    const merged = [ ...astroConfig, ...svelteConfig ];
    const results = await lintFixture(merged, 'svelte.svelte');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .astro files without fatal errors when combined with svelte config', async () => {
    const merged = [ ...astroConfig, ...svelteConfig ];
    const results = await lintFixture(merged, 'astro.astro');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });
});

describe('Regression: Astro + Svelte + TS parser conflicts', () => {
  let astroTsConfig;
  let svelteTsConfig;

  it('should load both TS configs', async () => {
    const { default: a } = await import('../configs/astro-ts.mjs');
    const { default: s } = await import('../configs/svelte-ts.mjs');
    astroTsConfig = a;
    svelteTsConfig = s;
  });

  it('should parse .svelte files without fatal errors when combined with astro-ts config', async () => {
    const merged = [ ...astroTsConfig, ...svelteTsConfig ];
    const results = await lintFixture(merged, 'svelte-ts.svelte');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .astro files without fatal errors when combined with svelte-ts config', async () => {
    const merged = [ ...astroTsConfig, ...svelteTsConfig ];
    const results = await lintFixture(merged, 'astro-ts.astro');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .ts files without fatal errors when both TS configs are combined', async () => {
    const merged = [ ...astroTsConfig, ...svelteTsConfig ];
    const results = await lintFixture(merged, 'typescript.ts', { typeChecking: true });
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });
});

describe('Regression: Astro + Vue parser conflicts', () => {
  it('should parse .vue files without fatal errors when combined with astro config', async () => {
    const { default: astroConfig } = await import('../configs/astro.mjs');
    const { default: vueConfig } = await import('../configs/vue.mjs');
    const merged = [ ...astroConfig, ...vueConfig ];
    const results = await lintFixture(merged, 'vue.vue');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .astro files without fatal errors when combined with vue config', async () => {
    const { default: astroConfig } = await import('../configs/astro.mjs');
    const { default: vueConfig } = await import('../configs/vue.mjs');
    const merged = [ ...astroConfig, ...vueConfig ];
    const results = await lintFixture(merged, 'astro.astro');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });
});

describe('Regression: Astro + Vue + TS parser conflicts', () => {
  it('should parse .vue files without fatal errors when combined with astro-ts config', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const { default: vueTsConfig } = await import('../configs/vue-ts.mjs');
    const merged = [ ...astroTsConfig, ...vueTsConfig ];
    const results = await lintFixture(merged, 'vue-ts.vue', { typeChecking: true });
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .astro files without fatal errors when combined with vue-ts config', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const { default: vueTsConfig } = await import('../configs/vue-ts.mjs');
    const merged = [ ...astroTsConfig, ...vueTsConfig ];
    const results = await lintFixture(merged, 'astro-ts.astro', { typeChecking: true });
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });
});

describe('Regression: typescript.mjs file patterns override framework parsers', () => {
  // Problem: typescript.mjs includes *.svelte, *.vue, *.astro in its file patterns.
  // When two -ts configs (both spreading ...ts) are combined, the second spread
  // re-applies @typescript-eslint/parser to framework files, overriding their
  // dedicated parsers (svelte-eslint-parser, vue-eslint-parser, astro-eslint-parser).
  //
  // This only manifests when the framework config comes BEFORE the other -ts config,
  // because ESLint flat config last-wins for parser assignment.

  it('should parse .svelte files when svelte-ts is listed BEFORE astro-ts', async () => {
    const { default: svelteTsConfig } = await import('../configs/svelte-ts.mjs');
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    // svelte first, astro second — astro's ...ts spread must NOT override svelte-eslint-parser
    const merged = [ ...svelteTsConfig, ...astroTsConfig ];
    const results = await lintFixture(merged, 'svelte-ts.svelte');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .astro files when astro-ts is listed BEFORE svelte-ts', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const { default: svelteTsConfig } = await import('../configs/svelte-ts.mjs');
    // astro first, svelte second — svelte's ...ts spread must NOT override astro-eslint-parser
    const merged = [ ...astroTsConfig, ...svelteTsConfig ];
    const results = await lintFixture(merged, 'astro-ts.astro');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .vue files when vue-ts is listed BEFORE astro-ts', async () => {
    const { default: vueTsConfig } = await import('../configs/vue-ts.mjs');
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    // vue first, astro second — astro's ...ts spread must NOT override vue-eslint-parser
    const merged = [ ...vueTsConfig, ...astroTsConfig ];
    const results = await lintFixture(merged, 'vue-ts.vue', { typeChecking: true });
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .vue files when vue-ts is listed BEFORE svelte-ts', async () => {
    const { default: vueTsConfig } = await import('../configs/vue-ts.mjs');
    const { default: svelteTsConfig } = await import('../configs/svelte-ts.mjs');
    const merged = [ ...vueTsConfig, ...svelteTsConfig ];
    const results = await lintFixture(merged, 'vue-ts.vue', { typeChecking: true });
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .svelte files when svelte-ts is listed BEFORE vue-ts', async () => {
    const { default: svelteTsConfig } = await import('../configs/svelte-ts.mjs');
    const { default: vueTsConfig } = await import('../configs/vue-ts.mjs');
    const merged = [ ...svelteTsConfig, ...vueTsConfig ];
    const results = await lintFixture(merged, 'svelte-ts.svelte');
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .ts files without fatal errors when svelte-ts + astro-ts combined', async () => {
    const { default: svelteTsConfig } = await import('../configs/svelte-ts.mjs');
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const merged = [ ...svelteTsConfig, ...astroTsConfig ];
    const results = await lintFixture(merged, 'typescript.ts', { typeChecking: true });
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });
});

describe('Regression: TypeScript rules enforced for framework files after file pattern fix', () => {
  // After removing .vue, .svelte, .astro from typescript.mjs file patterns,
  // verify that the framework -ts configs still apply @typescript-eslint/ rules.

  async function getEffectiveRules(config, fixtureName, { typeChecking = false } = {}) {
    const finalConfig = typeChecking ? [ ...config, typeCheckingConfig ] : config;
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: finalConfig,
      cwd: path.join(__dirname),
    });
    const effectiveConfig = await eslint.calculateConfigForFile(path.join(fixturesDir, fixtureName));
    return Object.keys(effectiveConfig.rules || {});
  }

  it('should apply @typescript-eslint rules to .svelte files via svelte-ts', async () => {
    const { default: svelteTsConfig } = await import('../configs/svelte-ts.mjs');
    const rules = await getEffectiveRules(svelteTsConfig, 'svelte-ts.svelte');
    const tsRules = rules.filter((r) => r.startsWith('@typescript-eslint/'));
    expect(tsRules.length).toBeGreaterThan(0);
    expect(tsRules).toContain('@typescript-eslint/no-unused-vars');
  });

  it('should apply @typescript-eslint rules to .vue files via vue-ts', async () => {
    const { default: vueTsConfig } = await import('../configs/vue-ts.mjs');
    const rules = await getEffectiveRules(vueTsConfig, 'vue-ts.vue', { typeChecking: true });
    const tsRules = rules.filter((r) => r.startsWith('@typescript-eslint/'));
    expect(tsRules.length).toBeGreaterThan(0);
    expect(tsRules).toContain('@typescript-eslint/no-unused-vars');
  });

  it('should apply @typescript-eslint rules to .astro files via astro-ts', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const rules = await getEffectiveRules(astroTsConfig, 'astro-ts.astro', { typeChecking: true });
    const tsRules = rules.filter((r) => r.startsWith('@typescript-eslint/'));
    expect(tsRules.length).toBeGreaterThan(0);
    expect(tsRules).toContain('@typescript-eslint/no-unused-vars');
  });

  it('should apply import/ rules to .astro files via astro-ts', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const rules = await getEffectiveRules(astroTsConfig, 'astro-ts.astro', { typeChecking: true });
    const importRules = rules.filter((r) => r.startsWith('import/'));
    expect(importRules.length).toBeGreaterThan(0);
    expect(importRules).toContain('import/no-unresolved');
  });

  it('should apply import/ rules to .svelte files via svelte-ts', async () => {
    const { default: svelteTsConfig } = await import('../configs/svelte-ts.mjs');
    const rules = await getEffectiveRules(svelteTsConfig, 'svelte-ts.svelte');
    const importRules = rules.filter((r) => r.startsWith('import/'));
    expect(importRules.length).toBeGreaterThan(0);
  });

  it('should apply import/ rules to .vue files via vue-ts', async () => {
    const { default: vueTsConfig } = await import('../configs/vue-ts.mjs');
    const rules = await getEffectiveRules(vueTsConfig, 'vue-ts.vue', { typeChecking: true });
    const importRules = rules.filter((r) => r.startsWith('import/'));
    expect(importRules.length).toBeGreaterThan(0);
  });
});

describe('Regression: CSS modules no-unsafe-assignment in Astro + React + TS', () => {
  // KNOWN BUG: CSS module imports are typed as `any`, triggering no-unsafe-assignment
  it.fails('should NOT flag CSS module class assignment as no-unsafe-assignment with astro-ts + react-ts', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const { default: reactTsConfig } = await import('../configs/react-ts.mjs');
    const merged = [ ...astroTsConfig, ...reactTsConfig ];
    const results = await lintFixture(merged, 'component-with-css-module.tsx', { typeChecking: true });
    const violations = getRuleViolations(results, '@typescript-eslint/no-unsafe-assignment');
    expect(violations).toEqual([]);
  });

  // KNOWN BUG: CSS module imports are typed as `any`, triggering no-unsafe-assignment
  it.fails('should NOT flag CSS module class assignment as no-unsafe-assignment with next-ts', async () => {
    const { default: nextTsConfig } = await import('../configs/next-ts.mjs');
    const results = await lintFixture(nextTsConfig, 'component-with-css-module.tsx', { typeChecking: true });
    const violations = getRuleViolations(results, '@typescript-eslint/no-unsafe-assignment');
    expect(violations).toEqual([]);
  });

  it('CSS module behavior should be consistent between astro-ts+react-ts and next-ts', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const { default: reactTsConfig } = await import('../configs/react-ts.mjs');
    const { default: nextTsConfig } = await import('../configs/next-ts.mjs');

    const astroReactMerged = [ ...astroTsConfig, ...reactTsConfig ];

    const astroReactResults = await lintFixture(astroReactMerged, 'component-with-css-module.tsx', { typeChecking: true });
    const nextResults = await lintFixture(nextTsConfig, 'component-with-css-module.tsx', { typeChecking: true });

    const astroReactViolations = getRuleViolations(astroReactResults, '@typescript-eslint/no-unsafe-assignment');
    const nextViolations = getRuleViolations(nextResults, '@typescript-eslint/no-unsafe-assignment');

    expect(astroReactViolations.length).toBe(nextViolations.length);
  });
});

describe('Regression: Astro + React + TS parser conflicts', () => {
  it('should parse .astro files without fatal errors when combined with react-ts', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const { default: reactTsConfig } = await import('../configs/react-ts.mjs');
    const merged = [ ...astroTsConfig, ...reactTsConfig ];
    const results = await lintFixture(merged, 'astro-ts.astro', { typeChecking: true });
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });

  it('should parse .tsx files without fatal errors when combined with astro-ts', async () => {
    const { default: astroTsConfig } = await import('../configs/astro-ts.mjs');
    const { default: reactTsConfig } = await import('../configs/react-ts.mjs');
    const merged = [ ...astroTsConfig, ...reactTsConfig ];
    const results = await lintFixture(merged, 'react-ts.tsx', { typeChecking: true });
    const fatals = getFatalErrors(results);
    expect(fatals).toEqual([]);
  });
});
