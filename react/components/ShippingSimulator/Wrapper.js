import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'
import { useRuntime } from 'vtex.render-runtime'

import ShippingSimulator from './index';

export default (props) => {
  const { culture } = useRuntime()
  const valuesFromContext = React.useContext(ProductContext)

  const shippingSimultatorProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props

    const { selectedItem } = valuesFromContext

    return {
      skuId: path(['itemId'], selectedItem),
      seller: path(['sellers', 0, 'sellerId'], selectedItem),
      country: culture.country,
    }
  }

  return (
    <ShippingSimulator { ...shippingSimultatorProps() } />
  )
}