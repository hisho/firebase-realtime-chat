import type { Config } from 'jest'

/**
 * @see https://jestjs.io/docs/configuration
 */
const config: Config = {
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
}

export default config
