'use strict'

const fs = require('fs')
const path = require('path')
const paths = require('../utils/paths')

module.exports = (resolve, rootDir, srcDirs) => {
  const setupTestsFile = fs.existsSync(paths.testsSetup)
    ? '<rootDir>/src/setupTests.js'
    : undefined

  const config = {
    roots: srcDirs.map(d => `<rootDir>/${path.relative(rootDir || '', d)}`),
    setupTestFrameworkScriptFile: setupTestsFile,
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx|mjs)$': require.resolve('babel-jest'),
      '^.+\\.css$': resolve('config/jest/cssTransform.js'),
      '^.+\\.(graphql|gql)$': resolve('config/jest/graphqlTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json|graphql)$)': resolve(
        'config/jest/fileTransform.js'
      ),
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  }

  if (rootDir) config.rootDir = rootDir

  return config
}
