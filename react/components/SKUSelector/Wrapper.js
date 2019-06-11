import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { pathOr } from 'ramda'

import SKUSelector from './index'

const SKUSelectorWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const skuItems =
    props.skuItems != null
      ? props.skuItems
      : pathOr([], ['product', 'items'], valuesFromContext)

  const skuSelected =
    props.skuSelected != null
      ? props.skuSelected
      : valuesFromContext.selectedItem

  if (
    skuItems.length <= 1 ||
    !skuSelected ||
    !skuSelected.variations ||
    skuSelected.variations.length === 0
  ) {
    return null
  }

  return (
    <SKUSelector
      alwaysShowSecondary={props.alwaysShowSecondary}
      onSKUSelected={props.onSKUSelected}
      skuItems={skuItems}
      skuSelected={skuSelected}
      maxItems={props.maxItems}
      seeMoreLabel={props.seeMoreLabel}
    />
  )
}

SKUSelectorWrapper.schema = {
  title: 'admin/editor.skuSelector.title',
  description: 'admin/editor.skuSelector.description',
}

export default SKUSelectorWrapper
