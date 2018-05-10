'use strict'

const fs = require('fs')
const path = require('path')
const paths = require('../utils/paths')
const overrides = require('../utils/overrides')

module.exports = (resolve, rootDir, srcDirs) => {
  const setupTestsFile = fs.existsSync(paths.testsSetup)
    ? `<rootDir>/${paths.rawTestsSetup}`
    : undefined

  let config = {
    roots: srcDirs.map(d => `<rootDir>/${path.relative(rootDir || '', d)}`),
    setupTestFrameworkScriptFile: setupTestsFile,
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx|mjs)$': resolve('config/jest/babelTransform.js'),
      '^.+\\.css$': resolve('config/jest/cssTransform.js'),
      '^.+\\.(graphql|gql)$': resolve('config/jest/graphqlTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json|graphql|gql)$)': resolve(
        'config/jest/fileTransform.js'
      ),
    },
    // Consider the node_modules installed in `vtex-scripts`, on the rootPath
    // and inside every source directory folder
    moduleDirectories: [
      '<rootDir>/node_modules',
      ...srcDirs.map(
        d =>
          `<rootDir>/${path.relative(
            rootDir || '',
            path.join(d, 'node_modules')
          )}`
      ),
      path.join(__dirname, '..', 'node_modules'),
    ],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    testPathIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\]',
      '(.*)[/\\\\]helpers[/\\\\](.*)',
    ],
    snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  }

  if (rootDir) config.rootDir = rootDir

  if (overrides.jest) {
    config = {
      ...config,
      ...overrides.jest,
    }
  }

  return config
}
