#!/usr/bin/env node
'use strict'

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

process.on('unhandledRejection', err => {
  throw err
})

const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config/webpack.config')

function build() {
  console.log('Creating production build...')

  const compiler = webpack(config)

  compiler.run((err /*, stat*/) => {
    if (err) {
      console.log(chalk.red('Failed to compile.\n'))
      console.log(err)
      // print compilation errors
      process.exit(1)
    }

    console.log(chalk.green('Compiled successfully.'))
  })
}

build()

module.exports = build
