import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'
import { useRuntime } from 'vtex.render-runtime'

import ShippingSimulator from './index'

const ShippingSimulatorWrapper = (props) => {
  const { culture } = useRuntime()
  const valuesFromContext = useContext(ProductContext)

  const shippingSimultatorProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    const { selectedItem } = valuesFromContext

    return {
      ...props,
      skuId: props.skuId || path(['itemId'], selectedItem),
      seller: props.seller || path(['sellers', 0, 'sellerId'], selectedItem),
      country: props.country || culture.country,
    }
  }

  return (
    <ShippingSimulator { ...shippingSimultatorProps() } />
  )
}

export default ShippingSimulatorWrapper