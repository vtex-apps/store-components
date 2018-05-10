'use strict'

const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  babelrc: false,
  presets: ['react', 'es2015'].map(preset =>
    require.resolve(`babel-preset-${preset}`)
  ),
  plugins: [
    'transform-es2015-modules-commonjs',
    'dynamic-import-node',
    'transform-class-properties',
  ].map(plugin => require.resolve(`babel-plugin-${plugin}`)),
})
