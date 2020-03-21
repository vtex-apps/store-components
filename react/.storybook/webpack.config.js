const path = require('path')

module.exports = async ({ config }) => {
  config.resolve.modules = [
    ...config.resolve.modules,
    path.resolve(__dirname, '__aliases__'),
    '__mocks__',
  ]
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    },
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            configFile: 'storybook.tsconfig.json',
        },
        },
      ],
    },
  ]
  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx']
  return config
}
