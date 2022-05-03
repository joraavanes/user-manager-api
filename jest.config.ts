/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  "roots": [
    "src/tests",
  ],
  "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testEnvironment": "node"
};
