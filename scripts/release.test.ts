import { analyzeCommits } from '@semantic-release/commit-analyzer';
import { generateNotes } from '@semantic-release/release-notes-generator';
import { describe, expect, it } from 'vitest';
import config from '../release.config.js';

/**
 * Guards the release pipeline: the changelog preset must stay compatible with the writer
 * bundled by semantic-release (a preset major bump once broke `generateNotes` only in CI).
 */
const options = (name: string) => {
  const plugin = config.plugins.find((entry) => Array.isArray(entry) && entry[0] === name);
  return (Array.isArray(plugin) ? plugin[1] : {}) as Record<string, unknown>;
};

const commit = (message: string, hash: string) => ({
  message,
  hash,
  commit: { long: hash, short: hash.slice(0, 7) },
});

const silent = { log: () => {}, error: () => {} };
const context = {
  cwd: process.cwd(),
  logger: silent,
  options: { repositoryUrl: 'https://github.com/LukastBorges/lukasborges.me.git' },
  lastRelease: { gitTag: 'v1.0.0', version: '1.0.0' },
  nextRelease: { gitTag: 'v1.1.0', version: '1.1.0' },
  commits: [
    commit('feat(experience): :sparkles: add expandable earlier roles', 'a'.repeat(40)),
    commit('fix: :bug: keep em dash on the first line', 'b'.repeat(40)),
    commit('docs: :memo: update readme', 'c'.repeat(40)),
  ],
};

describe('release pipeline', () => {
  it('classifies gitmoji conventional commits', async () => {
    const type = await analyzeCommits(options('@semantic-release/commit-analyzer'), context);
    expect(type).toBe('minor');
  });

  it('renders release notes with the configured preset', async () => {
    const notes = await generateNotes(
      options('@semantic-release/release-notes-generator'),
      context,
    );
    expect(notes).toContain('### Features');
    expect(notes).toContain('add expandable earlier roles');
    expect(notes).toContain('### Bug Fixes');
  });
});
