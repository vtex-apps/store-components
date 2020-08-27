import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path } from 'ramda'
import { useRuntime } from 'vtex.render-runtime'

import ShippingSimulator from './index'

const ShippingSimulatorWrapper = (props: any) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'culture' does not exist on type 'Runtime... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2322) FIXME: Property 'loaderStyles' does not exist on type 'In... Remove this comment to see the full error message
      loaderStyles={props.loaderStyles}
    />
  )
}

export default ShippingSimulatorWrapper
