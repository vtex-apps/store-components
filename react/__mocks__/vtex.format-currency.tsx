import React, { Fragment } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { injectIntl } from 'react-intl'

export function formatCurrency({ intl, culture, value }: any) {
  return intl.formatNumber(value, {
    style: 'currency',
    currency: culture.currency,
    ...(culture.customCurrencyDecimalDigits != null
      ? { minimumFractionDigits: culture.customCurrencyDecimalDigits }
      : {}),
  })
}

function BaseFormattedCurrency({ value, intl }: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'culture' does not exist on type 'Runtime... Remove this comment to see the full error message
  const { culture } = useRuntime()

  const number = intl.formatNumber(value, {
    style: 'currency',
    currency: culture.currency,
    ...(culture.customCurrencyDecimalDigits != null
      ? { minimumFractionDigits: culture.customCurrencyDecimalDigits }
      : {}),
  })

  return <Fragment>{number}</Fragment>
}

export const FormattedCurrency = injectIntl(BaseFormattedCurrency)
