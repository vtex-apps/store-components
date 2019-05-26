import React from 'react'
import { map, join } from 'ramda'
import { injectIntl } from 'react-intl'

const isValidPriceRange = priceRange => {
  const [lowPrice, highPrice] = priceRange
  return priceRange.length === 2 && lowPrice !== highPrice
}

const Price = ({
  showPriceRange,
  priceRange,
  price,
  rangeContainerClasses,
  singleContainerClasses,
  intl: { formatNumber },
  currencyOptions,
}) => {
  const mustShowPriceRange = showPriceRange && priceRange && isValidPriceRange(priceRange)

  const formatPrice = rawPrice => {
    return formatNumber(rawPrice, currencyOptions)
  }

  const formatPriceRange = rawPriceRange => {
    const priceRangeFormatted = map(formatPrice, rawPriceRange || [])
    return join(' - ', priceRangeFormatted)
  }

  if (mustShowPriceRange) {
    return (
      <span className={rangeContainerClasses}>
        {formatPriceRange(priceRange)}
      </span>
    )
  }
  return (
    <span className={singleContainerClasses}>
      {formatPrice(price)}
    </span>
  )
}

export default injectIntl(Price)
