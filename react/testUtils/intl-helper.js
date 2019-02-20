import React from 'react'
import { IntlProvider, intlShape } from 'react-intl'
import { shallow, render } from 'enzyme'

export const DEFAULT_LOCALE = 'en-US'

const config = { locale: DEFAULT_LOCALE }

const nodeWithIntlProp = node => {
  return React.cloneElement(node, { intl })
}

export const shallowWithIntl = (
  node,
  { context, ...additionalOptions } = {}
) => {
  return shallow(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    ...additionalOptions,
  })
}

export const renderWithIntl = (
  node,
  { context, childContextTypes, ...additionalOptions } = {}
) => {
  return render(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    childContextTypes: Object.assign(
      {},
      { intl: intlShape },
      childContextTypes
    ),
    ...additionalOptions,
  })
}

export const getMessages = (locale = DEFAULT_LOCALE) => {
  return require(`../../messages/${locale}.json`)
}

export const setLocale = locale => (config.locale = locale)

const intlProvider = new IntlProvider(
  { locale: config.locale, messages: getMessages(config.locale) },
  {}
)
const { intl } = intlProvider.getChildContext()
