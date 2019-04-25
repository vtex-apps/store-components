import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import AvailabilitySubscriber from './index';

export default (props) => {
  const valuesFromContext = React.useContext(ProductContext)

  const availabilitySuvscriberProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props
    
    const { selectedItem } = valuesFromContext
    const commertialOffer = path(['sellers', 0, 'commertialOffer'], selectedItem)

    return {
      skuId: path(['itemId'], selectedItem),
      available: Number.isNaN(+path(['AvailableQuantity'], commertialOffer)) || path(['AvailableQuantity'], commertialOffer) > 0,
    }
  }

  const { available, ...restProps } = availabilitySuvscriberProps()

  // Render component only if product is out of sales
  if (available) return null

  return (
    <AvailabilitySubscriber { ...restProps } />
  )
}
