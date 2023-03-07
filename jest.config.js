/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "./__tests__/tsconfig.json",
    },
  },
  transform: {
    "^.+\\.m?[tj]sx?$": [
      "ts-jest",
      {
        // ts-jest configuration goes here
      },
    ],
  },
};
