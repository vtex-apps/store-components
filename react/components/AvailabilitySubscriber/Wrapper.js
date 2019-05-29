import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import AvailabilitySubscriber from './index'

const AvailabilitySubscriberWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const isContextEmpty = !valuesFromContext || isEmpty(valuesFromContext)

  const skuId = isContextEmpty
    ? props.skuId
    : path(['selectedItem', 'itemId'], valuesFromContext)

  const commertialOffer = path(
    ['selectedItem', 'sellers', 0, 'commertialOffer'],
    valuesFromContext
  )

  const available = isContextEmpty
    ? props.available
    : Number.isNaN(+path(['AvailableQuantity'], commertialOffer)) ||
      path(['AvailableQuantity'], commertialOffer) > 0

  // Render component only if product is out of sales
  if (available) return null

  return (
    <AvailabilitySubscriber {...props} skuId={skuId} available={available} />
  )
}

export default AvailabilitySubscriberWrapper
