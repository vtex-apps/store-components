import PropTypes from 'prop-types'
import React, { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { filter, head, isEmpty, compose, keys, length } from 'ramda'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import SKUSelector from './components/SKUSelector'
import { skuShape } from './utils/proptypes'
import {
  parseSku,
  isColor,
  uniqueOptionToSelect,
  findItemWithSelectedVariations,
} from './utils'

const keyCount = compose(
  length,
  keys
)
const filterSelected = filter(Boolean)

const buildEmptySelectedVariation = variations => {
  const variationNames = Object.keys(variations)
  const result = {}
  for (const variationName of variationNames) {
    result[variationName] = null
  }
  return result
}

/** receives an item and the variations object, returns the selected variations for that item */
const selectedVariationFromItem = (item, variations) => {
  const variationNames = Object.keys(variations)
  const result = {}
  for (const variationName of variationNames) {
    result[variationName] = item[variationName]
  }
  return result
}

const useImagesMap = (items, variations) => {
  return useMemo(() => {
    const variationNames = Object.keys(variations)
    const result = {}
    for (const variationName of variationNames) {
      // Today, only "Color" variation should show image, need to find a more resilient way to tell this, waiting for backend
      if (!isColor(variationName)) {
        continue
      }
      const imageMap = {}
      const variationValues = variations[variationName]
      for (const variationValue of variationValues) {
        const item = items.find(sku => sku[variationName] === variationValue)
        imageMap[variationValue] = item && head(item.images)
      }
      result[variationName] = imageMap
    }
    return result
  }, [items, variations])
}

const useAllSelectedEvent = (selectedVariations, variationsCount) => {
  const dispatch = useProductDispatch()
  useEffect(() => {
    if (dispatch && selectedVariations) {
      const selectedNotNull = filterSelected(selectedVariations)
      const selectedCount = keyCount(selectedNotNull)
      const allSelected = selectedCount === variationsCount
      dispatch({
        type: 'SKU_SELECTOR_SET_VARIATIONS_SELECTED',
        allSelected,
      })
    }
  }, [dispatch, selectedVariations, variationsCount])
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
  const variationsCount = keyCount(variations)
  const [selectedVariations, setSelectedVariations] = useState(null)

  useAllSelectedEvent(selectedVariations, variationsCount)

  const parsedItems = useMemo(() => skuItems.map(parseSku), [skuItems])
  const { setQuery } = useRuntime()
  const redirectToSku = skuId => {
    setQuery(
      { skuId },
      {
        replace: true,
      }
    )
  }

  useEffect(() => {
    const initialVariations = skuSelected
      ? selectedVariationFromItem(parseSku(skuSelected), variations)
      : buildEmptySelectedVariation(variations)
    setSelectedVariations(initialVariations)
  }, [variations])

  const imagesMap = useImagesMap(parsedItems, variations)

  const onSelectItem = useCallback(
    ({
      name: variationName,
      value: variationValue,
      skuId,
      isMainAndImpossible,
      possibleItems,
    }) => {
      const isRemoving = selectedVariations[variationName] === variationValue
      const newSelectedVariation = !isMainAndImpossible
        ? {
            ...selectedVariations,
            [variationName]: isRemoving ? null : variationValue,
          }
        : {
            ...buildEmptySelectedVariation(variations),
            [variationName]: variationValue,
          }
      // Set here for a better response to user
      setSelectedVariations(newSelectedVariation)
      const uniqueOptions = isRemoving
        ? {}
        : uniqueOptionToSelect(
            possibleItems,
            newSelectedVariation,
            isMainAndImpossible
          )
      const finalSelected = {
        ...newSelectedVariation,
        ...uniqueOptions,
      }
      if (!isEmpty(uniqueOptions)) {
        setSelectedVariations(finalSelected)
      }

      const selectedNotNull = filterSelected(finalSelected)
      const selectedCount = keyCount(selectedNotNull)
      const allSelected = selectedCount === variationsCount
      let skuIdToRedirect = skuId
      if (!skuIdToRedirect || !isEmpty(uniqueOptions)) {
        const newItem = findItemWithSelectedVariations(
          possibleItems,
          finalSelected
        )
        skuIdToRedirect = newItem.itemId
      }

      if (isRemoving) {
        // If its just removing, no need to do anything.
        return
      }

      if (onSKUSelected) {
        onSKUSelected(skuIdToRedirect)
      } else {
        if (allSelected || isColor(variationName)) {
          redirectToSku(skuIdToRedirect)
        }
      }
    },
    [selectedVariations, variations, onSKUSelected]
  )

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

  hideImpossibleCombinations: PropTypes.bool,
}

SKUSelectorContainer.defaultProps = {
  maxItems: 10,
  hideImpossibleCombinations: true,
}

export default memo(SKUSelectorContainer)
