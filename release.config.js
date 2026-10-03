/**
 * semantic-release: runs in CI after a successful deploy to main (see .github/workflows/ci.yml).
 *
 * From Conventional Commits since the last tag it:
 *   1. works out the next version (feat → minor, fix/perf → patch, BREAKING CHANGE → major),
 *   2. writes CHANGELOG.md,
 *   3. sets package.json "version" to the release version (via @semantic-release/npm; nothing is
 *      published to the npm registry),
 *   4. commits CHANGELOG.md and package.json back to main, then tags it vX.Y.Z (default format),
 *   5. publishes a GitHub release with the generated notes.
 *
 * The tag and package.json version are produced by the same run, so they never drift apart.
 *
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ['main'],
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],
    ['@semantic-release/release-notes-generator', { preset: 'conventionalcommits' }],
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    // Version bump only: the package is private and never published.
    ['@semantic-release/npm', { npmPublish: false }],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        // [skip ci] keeps the release commit from triggering another pipeline run.
        // biome-ignore lint/suspicious/noTemplateCurlyInString: semantic-release template, not JS.
        message: 'chore(release): :bookmark: v${nextRelease.version} [skip ci]',
      },
    ],
    '@semantic-release/github',
  ],
};
