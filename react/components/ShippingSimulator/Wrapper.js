import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'
import { useRuntime } from 'vtex.render-runtime'

import ShippingSimulator from './index'

const ShippingSimulatorWrapper = props => {
  const { culture } = useRuntime()
  const productContext = useContext(ProductContext)

  const country = props.country || culture.country
  const skuId = props.skuId || path(['selectedItem', 'itemId'], productContext)
  const seller =
    props.seller ||
    path(['selectedItem', 'sellers', 0, 'sellerId'], productContext)

  return (
    <ShippingSimulator
      skuId={skuId}
      seller={seller}
      country={country}
      loaderStyles={props.loaderStyles}
    />
  )
}

export default ShippingSimulatorWrapper
