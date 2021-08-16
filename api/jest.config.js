module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: `coverage`,
  resetMocks: true,
  resetModules: true,
  preset: `ts-jest`,
  testEnvironment: `node`,
  moduleNameMapper: {
    "@api/(.*)": `<rootDir>/$1`,
  },
  testMatch: [`<rootDir>/**/*.spec.ts`],
}
