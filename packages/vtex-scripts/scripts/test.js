#!/usr/bin/env node
'use strict'

process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

process.on('unhandledRejection', err => {
  throw err
})

const jest = require('jest')
const path = require('path')
const paths = require('../utils/paths')
const createJestConfig = require('../config/createJestConfig')

function startTest(...processArgs) {
  const args = processArgs ? processArgs.slice(0) : []

  const config = createJestConfig(
    relativePath => path.resolve(__dirname, '..', relativePath),
    paths.appPath,
    paths.srcDirs
  )

  args.push('--config', JSON.stringify(config))

  jest.run(args)
}

module.exports = startTest
