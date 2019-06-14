import PropTypes from 'prop-types'
import React, { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { filter, head, reject, omit, isEmpty } from 'ramda'

import SKUSelector from './components/SKUSelector'
import { skuShape } from './utils/proptypes'
import {
  parseSku, isColor, variationsWithUniquePossibilities, findItemWithSelectedVariations, findListItemsWithSelectedVariations,
} from './utils'


const buildEmptySelectedVariation = (variations) => {
  return Object.keys(variations).reduce((acc, varName) => {
    return {
      ...acc,
      [varName]: null,
    }
  }, {})
}

/** receives an item and the variations object, returns the selected variations for that item */
const selectedVariationFromItem = (item, variations) => {
  return Object.keys(variations).reduce((acc, varName) => {
    return {
      ...acc,
      [varName]: item[varName],
    }
  },{})
}


//output: { color: [black: [imagelalala], blue: [image2lalala]]}
const buildImagesMap = (items, variations) => {
  return Object.keys(variations).reduce((acc, varName) => {
    // Today, only "Color" variation should show image, need to find a more resilient way to tell this, waiting for backend
    if (!isColor(varName)) {
      return acc
    }
    const imageMap = {}
    const variationValues = variations[varName]
    variationValues.forEach(variationValue => {
      const item = items.find(sku => sku[varName] === variationValue)
      imageMap[variationValue] = item && head(item.images)
    })
    return {
      ...acc,
      [varName]: imageMap,
    }
  }, {})
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

  const [selectedVariations, setSelectedVariations] = useState(null)
  useEffect(() => {
    const initalVariations = skuSelected ? selectedVariationFromItem(parseSku(skuSelected), variations) : buildEmptySelectedVariation(variations)
    setSelectedVariations(initalVariations)
  }, [])
  
  const imagesMap = useMemo(() => buildImagesMap(parsedItems, variations), [parsedItems, variations])
  
  const onSelectItem = useCallback((variationName, variationValue, skuId, isMainAndImpossible) => {
    const isRemoving = selectedVariations[variationName] === variationValue
    const changedVariation = !isMainAndImpossible ? 
      {
      ...selectedVariations,
      [variationName]: isRemoving ? null : variationValue,
      } : 
      { 
        ...buildEmptySelectedVariation(variations),
        [variationName]: variationValue 
      }

    const otherVariations = omit([variationName], !isMainAndImpossible ? selectedVariations : changedVariation)
    const emptyVariations = reject(Boolean, otherVariations)

    const { onlyOptions, possibleItems } = variationsWithUniquePossibilities(parsedItems, variations, Object.keys(emptyVariations), changedVariation)
    const newSelectedVariation = { ...changedVariation, ...onlyOptions }
    setSelectedVariations(newSelectedVariation)
    const selectedNotNull = filter(Boolean, newSelectedVariation)
    const selectedCount = Object.keys(selectedNotNull).length
    const variationsCount = Object.keys(variations).length
    const allSelected = selectedCount === variationsCount
    let skuIdToRedirect = skuId
    if (!isEmpty(onlyOptions)) {
      const newItem = findItemWithSelectedVariations(possibleItems, newSelectedVariation)
      skuIdToRedirect = newItem.itemId
    }
    if (!skuId) {
      const [newItem] = findListItemsWithSelectedVariations(possibleItems, newSelectedVariation)
      skuIdToRedirect = newItem.itemId
    }

    if (onSKUSelected) {
      onSKUSelected(skuIdToRedirect)
    } else {
      if (allSelected || (isColor(variationName) && !isRemoving)) {
        redirectToSku(skuIdToRedirect)
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
