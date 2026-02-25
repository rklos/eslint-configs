import { describe, it, expect } from 'vitest';

function extractConfigSummary(configArray) {
  return configArray.map((entry, index) => ({
    index,
    files: entry.files || undefined,
    ignores: entry.ignores || undefined,
    plugins: entry.plugins ? Object.keys(entry.plugins).sort() : undefined,
    rules: entry.rules ? Object.keys(entry.rules).sort() : undefined,
    hasLanguageOptions: !!entry.languageOptions,
    hasSettings: !!entry.settings,
  }));
}

// [name, skip reason or false]
const configEntries = [
  [ 'base', false ],
  [ 'typescript', false ],
  [ 'react', false ],
  [ 'react-ts', false ],
  [ 'next', false ],
  [ 'next-ts', false ],
  [ 'vue', false ],
  [ 'vue-ts', false ],
  [ 'svelte', false ],
  [ 'svelte-ts', false ],
  [ 'astro', false ],
  [ 'astro-ts', false ],
  [ 'jest', false ],
  [ 'vitest', false ],
  [ 'cypress', false ],
  [ 'nest', false ],
];

describe('Config snapshots', () => {
  for (const [ name, skipReason ] of configEntries) {
    const descFn = skipReason ? describe.skip : describe;
    descFn(`${name}${skipReason ? ` (SKIPPED: ${skipReason})` : ''}`, () => {
      it(`${name} config structure should match snapshot`, async () => {
        const { default: config } = await import(`../configs/${name}.mjs`);
        const summary = extractConfigSummary(Array.isArray(config) ? config : [ config ]);
        expect(summary).toMatchSnapshot();
      });
    });
  }
});
