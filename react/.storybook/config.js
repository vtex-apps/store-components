import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { withI18n } from 'storybook-addon-i18n'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { LocaleProvider } from './LocaleProvider'

import 'vtex-tachyons'

import messages_en from '../../messages/en.json'
import messages_pt from '../../messages/pt.json'
import messages_es from '../../messages/es.json'
const messages = {
  en: messages_en,
  pt: messages_pt,
  es: messages_es,
}

addDecorator(withI18n)
addDecorator(storyFn => (
  <MockedProvider resolvers={{}}>{storyFn()}</MockedProvider>
))

const language = navigator.language.split(/[-_]/)[0] // language without region code

addParameters({
  i18n: {
    provider: LocaleProvider,
    providerProps: {
      defaultLocale: 'en',
      messages: messages,
    },
    supportedLocales: ['en', 'pt', 'es'],
    providerLocaleKey: 'locale',
  },
})

// automatically import all files ending in *.stories.js
const req = require.context('../__stories__', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
