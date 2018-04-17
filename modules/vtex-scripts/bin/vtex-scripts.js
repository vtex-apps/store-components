#!/usr/bin/env node
'use strict'

const spawn = require('cross-spawn')
const args = process.argv.slice(2)

if (args.length === 0) {
  // print usage
  process.exit(1)
}

const scriptIndex = args.findIndex(x => x === 'build')
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []

switch (script) {
  case 'build': {
    const result = spawn.sync(
      'node',
      nodeArgs
        .concat(require.resolve(`../scripts/${script}`))
        .concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    )

    if (result.signal) {
      process.exit(1)
    }

    if (result.status > 0) {
      console.log(`An error occurred while running the script "${script}".\n`)
      console.log(
        'If you think this is a bug in our tools, feel free to file a bug report at',
        'https://www.github.com/vtex-apps/npm-storecomponents/issues\n'
      )
    }

    process.exit(result.status)
    break
  }
  default:
    console.log(`Unknown script "${script}".`)
    break
}
