import React, { useContext, useMemo } from 'react'
import { ProductContext } from 'vtex.product-context'
import { pathOr } from 'ramda'

import SKUSelector from './index'

const useVariations = (skuItems, shouldNotShow) => {
  const result = useMemo(() => {
    if (shouldNotShow) {
      return {}
    }
    const variations = {}
    for (const skuItem of skuItems) {
      for (const currentVariation of skuItem.variations) {
        const { name, values } = currentVariation
        const value = values[0]
        const currentSet = variations[name] || new Set()
        currentSet.add(value)
        variations[name] = currentSet
      }
    }
    const variationsNames = Object.keys(variations)
    // Transform set back to array
    for (const variationName of variationsNames) {
      const set = variations[variationName]
      variations[variationName] = Array.from(set)
    }
    return variations
  }, [skuItems, shouldNotShow])
  return result
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

  const shouldNotShow =
    skuItems.length === 0 ||
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
