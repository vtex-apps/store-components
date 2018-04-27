import PropTypes from 'prop-types'
import { IntlProvider, intlShape } from 'react-intl'

export const DEFAULT_LOCALE = 'en-US'

export function getIntlContextInfo() {
  const context = {
    culture: {
      currency: 'USD',
    },
  }

  const childContextTypes = {
    intl: intlShape,
    culture: PropTypes.object,
  }

  return { context, childContextTypes, locale: DEFAULT_LOCALE }
}

export function getIntlInstance(
  props = { locale: DEFAULT_LOCALE },
  context = {}
) {
  const intlProvider = new IntlProvider(
    { messages: props.messages || getMessages(props.locale), ...props },
    context
  )
  return intlProvider.getChildContext().intl
}

export function getMessages(locale = DEFAULT_LOCALE) {
  return require(`../../locales/${locale}.json`)
}
