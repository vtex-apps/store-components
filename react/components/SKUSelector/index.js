import PropTypes from 'prop-types'
import React, { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { filter, head, isEmpty } from 'ramda'

import SKUSelector from './components/SKUSelector'
import { skuShape } from './utils/proptypes'
import {
  parseSku, isColor, uniqueOptionToSelect, findItemWithSelectedVariations,
} from './utils'


const buildEmptySelectedVariation = (variations) => {
  const variationNames = Object.keys(variations)
  const result = {}
  for (const varName of variationNames) {
    result[varName] = null
  }
  return result
}

/** receives an item and the variations object, returns the selected variations for that item */
const selectedVariationFromItem = (item, variations) => {
  const variationNames = Object.keys(variations)
  const result = {}
  for (const varName of variationNames) {
    result[varName] = item[varName]
  }
  return result
}

const useImagesMap = (items, variations) => {
  return useMemo(() => {
    const variationNames = Object.keys(variations)
    const result = {}
    for (const varName of variationNames) {
      // Today, only "Color" variation should show image, need to find a more resilient way to tell this, waiting for backend
      if (!isColor(varName)) {
        continue
      }
      const imageMap = {}
      const variationValues = variations[varName]
      for (const variationValue of variationValues) {
        const item = items.find(sku => sku[varName] === variationValue)
        imageMap[variationValue] = item && head(item.images)
      }
      result[varName] = imageMap
    }
    return result
  }, [items, variations])
}

/**
 * Display a list of SKU items of a product and its specifications.
 */
const SKUSelectorContainer = ({
  skuItems = [],
  onSKUSelected,
  seeMoreLabel,
  maxItems,
  variations,
  skuSelected,
  hideImpossibleCombinations,
}) => {
  const parsedItems = useMemo(() => skuItems.map(parseSku), [skuItems])

  const { setQuery } = useRuntime()
  const redirectToSku = (skuId) => {
    setQuery(
      { skuId },
      {
        replace: true,
      }
    )
  }
  const [selectedSkuId, setSelectedSkuId] = useState(null)
  const [selectedVariations, setSelectedVariations] = useState(null)
  useEffect(() => {
    const initalVariations = skuSelected ? selectedVariationFromItem(parseSku(skuSelected), variations) : buildEmptySelectedVariation(variations)
    skuSelected && setSelectedSkuId(skuSelected.itemId)
    setSelectedVariations(initalVariations)
  }, [])
  
  const imagesMap = useImagesMap(parsedItems, variations)
  
  const onSelectItem = useCallback(({ name: variationName, value: variationValue, skuId, isMainAndImpossible, possibleItems }) => {
    const isRemoving = selectedVariations[variationName] === variationValue
    const newSelectedVariation = !isMainAndImpossible ? 
      {
      ...selectedVariations,
      [variationName]: isRemoving ? null : variationValue,
      } : 
      { 
        ...buildEmptySelectedVariation(variations),
        [variationName]: variationValue 
      }
    // Set here for a better response to user
    setSelectedVariations(newSelectedVariation)
    const uniqueOptions = isRemoving ? {} : uniqueOptionToSelect(possibleItems, newSelectedVariation)
    const finalSelected = {
      ...newSelectedVariation,
      ...uniqueOptions,
    }
    if (!isEmpty(uniqueOptions)) {
      setSelectedVariations(finalSelected)
    }
    
    const selectedNotNull = filter(Boolean, finalSelected)
    const selectedCount = Object.keys(selectedNotNull).length
    const variationsCount = Object.keys(variations).length
    const allSelected = selectedCount === variationsCount
    let skuIdToRedirect = skuId
    if (!skuIdToRedirect || !isEmpty(uniqueOptions)) {
      const newItem = findItemWithSelectedVariations(possibleItems, finalSelected)
      skuIdToRedirect = newItem.itemId
    }

    if (selectedSkuId === skuIdToRedirect || isRemoving) {
      // do nothing
      return
    }

    if (onSKUSelected) {
      setSelectedSkuId(skuIdToRedirect)
      onSKUSelected(skuIdToRedirect)
    } else {
      if (allSelected || (isColor(variationName))) {
        setSelectedSkuId(skuIdToRedirect)
        setTimeout(() => redirectToSku(skuIdToRedirect), 0)
      }
    }
  }, [selectedVariations, variations, onSKUSelected])

  if (!selectedVariations) {
    return null
  }

  return (
    <SKUSelector
      variations={variations}
      seeMoreLabel={seeMoreLabel}
      maxItems={maxItems}
      skuItems={parsedItems}
      selectedVariations={selectedVariations}
      imagesMap={imagesMap}
      onSelectItem={onSelectItem}
      hideImpossibleCombinations={hideImpossibleCombinations}
    />
  )
}

SKUSelectorContainer.propTypes = {
  /** SKU selected */
  skuSelected: skuShape,
  /** List of SKU Items */
  skuItems: PropTypes.arrayOf(skuShape).isRequired,
  /** Callback that is called when an SKU is selected */
  onSKUSelected: PropTypes.func,
  seeMoreLabel: PropTypes.string,
  maxItems: PropTypes.number,

  /** Object with dynamic keys, with keys being the name of variations and its values being an array of possible values.
   * Example: { "size": ["small", "medium", "large"], "color": ["blue", "yellow"] }
   */
  variations: PropTypes.object,

  skuSelected: skuShape,

  hideImpossibleCombinations: PropTypes.bool,
}

SKUSelectorContainer.defaultProps = {
  maxItems: 10,
  hideImpossibleCombinations: true,
}

export default memo(SKUSelectorContainer)
