import React, { PureComponent } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'

import locale_en from 'react-intl/locale-data/en'
import locale_pt from 'react-intl/locale-data/pt'
import locale_es from 'react-intl/locale-data/es'
addLocaleData([...locale_en, ...locale_pt, ...locale_es])

export class LocaleProvider extends PureComponent {
  render() {
    const { locale, messages } = this.props
    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        {this.props.children}
      </IntlProvider>
    )
  }
}
