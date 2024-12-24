import type {Config} from 'jest'

const config: Config = {
  testEnvironment: 'node',
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  automock: false,
};

export default config;
