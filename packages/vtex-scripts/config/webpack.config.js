const path = require('path')
const paths = require('../utils/paths')

module.exports = {
  bail: true,
  entry: paths.entryPath,
  output: {
    path: paths.distPath,
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths.srcPath,
        exclude: /(node_modules|bower_components|dist|__tests__)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'graphql-tag/loader',
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', 'node_modules')],
  },
  externals: {
    react: 'commonjs2 react',
    'prop-types': 'commonjs2 prop-types',
  },
  target: 'web',
  mode: 'production',
}
