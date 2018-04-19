'use strict'

const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = relative => path.resolve(appDirectory, relative)

const packageJsonPath = resolveAppPath('package.json')

const { vtexScriptsOverride } = require(packageJsonPath)

module.exports = {
  appPath: resolveAppPath('.'),
  entryPath: resolveAppPath('src/index.js'),
  srcPath: resolveAppPath('src'),
  distPath: resolveAppPath('dist'),
  rawTestsSetup: 'src/setupTests.js',
  testsSetup: resolveAppPath('src/setupTests.js'),
}

if (vtexScriptsOverride) {
  const srcPath = vtexScriptsOverride.appPath || 'src'
  const distPath = vtexScriptsOverride.distPath || 'dist'
  const setupTestsFilename =
    vtexScriptsOverride.setupTestsFilename || 'setupTests.js'

  module.exports = {
    appPath: resolveAppPath('.'),
    entryPath: resolveAppPath(path.join(srcPath, 'index.js')),
    srcPath: resolveAppPath(srcPath),
    distPath: resolveAppPath(distPath),
    rawTestsSetup: path.join(srcPath, setupTestsFilename),
    testsSetup: resolveAppPath(path.join(srcPath, setupTestsFilename)),
  }
}

module.exports.packageJsonPath = packageJsonPath
module.exports.moduleName = path.basename(process.cwd())
module.exports.srcDirs = [module.exports.srcPath]
