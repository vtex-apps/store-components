#!/usr/bin/env node
'use strict'

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

process.on('unhandledRejection', err => {
  throw err
})

const printBuildError = require('react-dev-utils/printBuildError')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const chalk = require('chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const paths = require('../utils/paths')
const config = require('../config/webpack.config')

new Promise(res => {
  res(fs.emptyDir(paths.distPath))
})
  .then(() => build())
  .then(
    ({ warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings'))
        console.log(warnings.join('\n\n'))
      } else {
        console.log(chalk.green('Compiled successfully.'))
      }
    },
    errors => {
      console.log(chalk.red('Failed to compile.\n'))
      printBuildError(errors)
      process.exit(1)
    }
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })

function build() {
  console.log('Creating production build...\n')

  const compiler = webpack(config)

  return new Promise((res, rej) => {
    compiler.run((err, stat) => {
      if (err) {
        rej(err)
      }

      const messages = formatWebpackMessages(stat.toJson({}, true))

      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return rej(new Error(messages.errors.join('\n\n')))
      }

      return res({
        stat,
        warnings: messages.warnings,
      })
    })
  })
}
