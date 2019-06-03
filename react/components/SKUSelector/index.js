import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRuntime } from 'vtex.render-runtime'

import SKUSelector from './components/SKUSelector'
import { skuShape } from './utils/proptypes'
import {
  groupItemsByVariation,
  getMainVariationName,
  getMaxSkuPrice,
  parseSku,
} from './utils'

/**
 * Display a list of SKU items of a product and its specifications.
 */
const SKUSelectorContainer = ({
  alwaysShowSecondary = true,
  skuItems = [],
  skuSelected,
  onSKUSelected,
  seeMoreLabel,
  maxItems,
}) => {
  const [mainVariation, setMainVariation] = useState(null)
  const [secondaryVariation, setSecondaryVariation] = useState(null)

  const { setQuery } = useRuntime()

  const parsedItems = useMemo(() => skuItems.map(parseSku), [skuItems])

  const buildVariations = useCallback(
    sku => {
      const itemId = sku.itemId
      const variations = sku.variations

      const name = getMainVariationName(variations)
      const mainVariation = {
        name,
        value: skuSelected ? sku[name] : null,
        options: groupItemsByVariation(name, parsedItems),
      }

      const secondaryVariation = { value: skuSelected ? itemId : null }

      const filteredSkus = parsedItems.filter(s => s[name] === sku[name])

      if (variations.length > 1) {
        secondaryVariation.name = variations.find(
          variation => variation !== name
        )
        secondaryVariation.options = groupItemsByVariation(
          secondaryVariation.name,
          filteredSkus
        )
      }

      return { mainVariation, secondaryVariation }
    },
    [parsedItems, skuSelected]
  )

  useEffect(() => {
    const sku = (skuSelected && parseSku(skuSelected)) || parsedItems[0]

    const { mainVariation, secondaryVariation } = buildVariations(sku)

    setMainVariation(mainVariation)
    setSecondaryVariation(secondaryVariation)
  }, [skuSelected, parsedItems, buildVariations])

  const redirectToSku = (skuId, isMainVariation) => {
    setQuery(
      { skuId },
      {
        replace: !isMainVariation,
      }
    )
  }

  const handleSkuSelection = (isMainVariation, skuId) => {
    const sku = parsedItems.find(({ itemId }) => itemId === skuId)
    const {
      secondaryVariation: { options },
    } = buildVariations(sku)

    const isSecondaryPicked =
      !isMainVariation || (options && options.length === 1)

    if (onSKUSelected) {
      onSKUSelected(skuId, isMainVariation, isSecondaryPicked)
    } else {
      redirectToSku(skuId, isMainVariation)
    }
  }

  if (parsedItems.length === 0) {
    return null
  }

  const maxSkuPrice = getMaxSkuPrice(parsedItems)

  return (
    <SKUSelector
      mainVariation={mainVariation}
      secondaryVariation={secondaryVariation}
      onSelectSKU={handleSkuSelection}
      maxSkuPrice={maxSkuPrice}
      alwaysShowSecondary={alwaysShowSecondary}
      seeMoreLabel={seeMoreLabel}
      maxItems={maxItems}
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
  /** If true, show secondary options (if present), even when main variation is not picked yet. Default to true */
  shouldShowSecondary: PropTypes.bool,
  alwaysShowSecondary: PropTypes.bool,
  seeMoreLabel: PropTypes.string,
}

SKUSelectorContainer.defaultProps = {
  maxItems: 10,
}

SKUSelectorContainer.schema = {
  title: 'admin/editor.skuSelector.title',
  description: 'admin/editor.skuSelector.description',
  type: 'object',
  properties: {
    maxItems: {
      title: 'admin/editor.skuSelector.maxItems.title',
      description: 'admin/editor.skuSelector.maxItems.description',
      default: 10,
      type: 'number',
      isLayout: true,
    }
  }
}

export default SKUSelectorContainer
