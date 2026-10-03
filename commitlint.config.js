/** Conventional Commits + gitmoji: `type(scope)?: :gitmoji: subject`. */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
    'subject-gitmoji': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'subject-gitmoji': ({ subject }) => [
          /^:[a-z0-9_+-]+: \S/.test(subject ?? ''),
          'subject must start with a gitmoji shortcode, e.g. ":sparkles: add hero"',
        ],
      },
    },
  ],
};
