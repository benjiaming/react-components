module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+.tsx?$': [
      'ts-jest',
      {},
    ],
    '^.+\\.tsx?$': [
      'ts-jest',
      {},
    ],
  },
}