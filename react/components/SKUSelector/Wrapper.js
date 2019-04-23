import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import SKUSelector from './index';

export default (props) => {
  const valuesFromContext = React.useContext(ProductContext)

  const skuSelectorProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props

    const { product, selectedItem } = valuesFromContext

    return {
      skuItems: path(['items'], product),
      skuSelected: selectedItem,
      productSlug: path(['linkText'], product),
    }
  }

  return (
    <SKUSelector { ...skuSelectorProps()} />
  )
}