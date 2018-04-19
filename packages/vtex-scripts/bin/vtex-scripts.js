#!/usr/bin/env node
'use strict'

const args = process.argv.slice(2)

if (args.length === 0) {
  process.exit(1)
}

const script = args[0]

switch (script) {
  case 'test':
  case 'build': {
    const executeScript = require(`../scripts/${script}`)

    try {
      executeScript(...args.slice(1))
    } catch (e) {
      console.log(`An error occurred while running the script "${script}".\n`)
      console.log(
        'If you think this is a bug in our tools, feel free to file a bug report at',
        'https://www.github.com/vtex-apps/npm-storecomponents/issues\n'
      )
      process.exit(1)
    }
    break
  }
  default:
    console.log(`Unknown script "${script}".`)
    break
}
