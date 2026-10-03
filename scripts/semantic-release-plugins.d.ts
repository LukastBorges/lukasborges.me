// Minimal types for the semantic-release plugins exercised in release.test.ts (they ship none).
declare module '@semantic-release/commit-analyzer' {
  export function analyzeCommits(
    pluginConfig: Record<string, unknown>,
    context: object,
  ): Promise<'major' | 'minor' | 'patch' | null>;
}

declare module '@semantic-release/release-notes-generator' {
  export function generateNotes(
    pluginConfig: Record<string, unknown>,
    context: object,
  ): Promise<string>;
}
