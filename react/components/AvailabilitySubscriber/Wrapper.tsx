import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path } from 'ramda'

import AvailabilitySubscriber from './index'

const isAvailable = (commertialOffer: any) =>
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  Number.isNaN(+path(['AvailableQuantity'], commertialOffer)) ||
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  path(['AvailableQuantity'], commertialOffer) > 0

const AvailabilitySubscriberWrapper = (props: any) => {
  const valuesFromContext = useContext(ProductContext)

  const commertialOffer = path(
    ['selectedItem', 'sellers', 0, 'commertialOffer'],
    valuesFromContext
  )

  const available =
    props.available != null ? props.available : isAvailable(commertialOffer)

  // Render component only if product is out of sales
  if (available) return null

  const skuId =
    props.skuId != null
      ? props.skuId
      : path(['selectedItem', 'itemId'], valuesFromContext)

  return <AvailabilitySubscriber skuId={skuId} />
}

export default AvailabilitySubscriberWrapper
