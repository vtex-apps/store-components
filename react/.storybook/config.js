import React from 'react'
import { configure, addDecorator } from '@storybook/react'

const { IntlProvider } = require('react-intl')
const { MockedProvider } = require('react-apollo/test-utils')

import 'vtex-tachyons'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(storyFn => (
  <MockedProvider resolvers={{}}>{storyFn()}</MockedProvider>
))
addDecorator(storyFn => <IntlProvider locale="en">{storyFn()}</IntlProvider>)

configure(loadStories, module)
