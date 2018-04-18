'use strict'

const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = relative => path.resolve(appDirectory, relative)

module.exports = {
  appPath: resolveAppPath('.'),
  entryPath: resolveAppPath('src/index.js'),
  srcPath: resolveAppPath('src'),
  distPath: resolveAppPath('dist'),
  testsSetup: resolveAppPath('src/setupTests.js'),
  moduleName: path.basename(process.cwd()),
}

module.exports.srcDirs = [module.exports.srcPath]
