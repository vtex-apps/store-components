import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { isEmpty, pathOr } from 'ramda'

import SKUSelector from './index'

const SKUSelectorWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const skuItems =
    props.skuItems != null
      ? props.skuItems
      : pathOr([], ['product', 'items'], valuesFromContext)

  const skuSelected =
    props.onSKUSelected != null
      ? props.skuSelected
      : valuesFromContext.selectedItem

  return (
    <SKUSelector
      alwaysShowSecondary={props.alwaysShowSecondary}
      onSKUSelected={props.onSKUSelected}
      skuItems={skuItems}
      skuSelected={skuSelected}
    />
  )
}

export default SKUSelectorWrapper
