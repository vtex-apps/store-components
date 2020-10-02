import React from 'react'
import { injectIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedCurrency, formatCurrency } from 'vtex.format-currency'

const isValidPriceRange = (priceRange: any) => {
  const [lowPrice, highPrice] = priceRange

  return priceRange.length === 2 && lowPrice !== highPrice
}

const formatPriceRange = (intl: any, culture: any, rawPriceRange: any) => {
  const priceRangeFormatted = (rawPriceRange || []).map((value: any) =>
    formatCurrency({ intl, culture, value })
  )

  return priceRangeFormatted.join(' - ')
}

const Price = ({
  showPriceRange,
  priceRange,
  price,
  rangeContainerClasses,
  singleContainerClasses,
  intl,
}: any) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'culture' does not exist on type 'Runtime... Remove this comment to see the full error message
  const { culture } = useRuntime()

  const mustShowPriceRange =
    showPriceRange && priceRange && isValidPriceRange(priceRange)

  if (mustShowPriceRange) {
    return (
      <span className={rangeContainerClasses}>
        {formatPriceRange(intl, culture, priceRange)}
      </span>
    )
  }

  return (
    <span className={singleContainerClasses}>
      <FormattedCurrency value={price} />
    </span>
  )
}

export default injectIntl(Price)
