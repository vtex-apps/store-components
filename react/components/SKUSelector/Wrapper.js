import React, { useContext, useMemo } from 'react'
import { ProductContext } from 'vtex.product-context'
import { pathOr } from 'ramda'

import SKUSelector from './index'

const useVariations = (skuItems, shouldNotShow) => {
  const variations = useMemo(() => shouldNotShow ? {} : skuItems.reduce((totalAcc, skuItem) => {
    const indivVariations = skuItem.variations.reduce((indivAcc, currentVariation) => {
      const { name, values } = currentVariation
      const value = values[0]
      const currentArray = totalAcc[name] || []
      if (!currentArray.includes(value)) {
        currentArray.push(value)
      }
      return { ...indivAcc, [name]: currentArray }
    }, {})
    return {
      ...totalAcc,
      ...indivVariations,
    }
  }, {}), [skuItems, shouldNotShow])
  return variations
}

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
  
  const shouldNotShow = skuItems.length <= 1 ||
    !skuSelected ||
    !skuSelected.variations ||
    skuSelected.variations.length === 0

  const variations = useVariations(skuItems, shouldNotShow)

  if (shouldNotShow) {
    return null
  }

  return (
    <SKUSelector
      onSKUSelected={props.onSKUSelected}
      skuItems={skuItems}
      skuSelected={skuSelected}
      maxItems={props.maxItems}
      seeMoreLabel={props.seeMoreLabel}
      variations={variations}
      hideImpossibleCombinations={props.hideImpossibleCombinations}
    />
  )
}

SKUSelectorWrapper.schema = {
  title: 'admin/editor.skuSelector.title',
  description: 'admin/editor.skuSelector.description',
}

export default SKUSelectorWrapper
