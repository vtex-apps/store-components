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
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
          },
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      },
      {
        test: /\.(gif|png|jpeg|jpg|woff|woff2|eot|ttf)$/,
        loader: require.resolve('url-loader'),
      },
      {
        test: /\.(svg)$/,
        use: {
          loader: require.resolve('svg-inline-loader'),
        },
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(paths.appPath, 'node_modules'),
      path.resolve(paths.srcPath, 'node_modules'),
    ],
  },
  externals: {
    react: 'commonjs2 react',
    'prop-types': 'commonjs2 prop-types',
  },
  performance: {
    hints: false,
  },
  target: 'web',
  mode: 'production',
}

