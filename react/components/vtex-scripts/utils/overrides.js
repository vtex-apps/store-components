'use strict'

const paths = require('./paths')

const packageJson = require(paths.packageJsonPath)

let vtexScriptsOverrides = {}

if (packageJson.vtexScriptsOverrides) {
  vtexScriptsOverrides = packageJson.vtexScriptsOverrides
}

module.exports = vtexScriptsOverrides
