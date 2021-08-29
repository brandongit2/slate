module.exports = {
  plugins: [`react`, `react-hooks`],
  extends: [
    `../.eslintrc.js`,
    `plugin:react/recommended`,
    `plugin:react-hooks/recommended`,
    `next`,
    `next/core-web-vitals`,
  ],
  env: {
    es6: true,
    browser: true,
  },
  settings: {
    react: {
      version: `detect`,
    },
  },
  rules: {
    "react/prop-types": 0,
  },
  ignorePatterns: [`**/*.generated.ts`],
}
