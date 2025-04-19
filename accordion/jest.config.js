module.exports = {
  __esModule: true,
  default: {
    testEnvironment: 'node',
    transform: {
      '^.+.tsx?$': [
        'ts-jest',
        {},
      ],
    },
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {},
    ],
  },
}