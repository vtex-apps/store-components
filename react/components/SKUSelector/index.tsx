import React, {
  useState,
  useEffect,
  useMemo,
  memo,
  useCallback,
  FC,
} from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { filter, head, isEmpty, compose, keys, length, path } from 'ramda'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import SKUSelector from './components/SKUSelector'
import {
  parseSku,
  isColor,
  uniqueOptionToSelect,
  findItemWithSelectedVariations,
} from './utils'
import {
  ProductItem,
  SelectedVariations,
  SelectorProductItem,
  ImageMap,
  Image,
  Variations,
  InitialSelectionType,
} from './types'

const keyCount = compose(
  length,
  keys
)
const filterSelected = filter(Boolean)

const buildEmptySelectedVariation = (variations: Variations) => {
  const variationNames = Object.keys(variations)
  const result = {} as Record<string, null>
  for (const variationName of variationNames) {
    result[variationName] = null
  }
  return result
}

/** receives an item and the variations object, returns the selected variations for that item */
const selectedVariationFromItem = (
  item: SelectorProductItem,
  variations: Variations
) => {
  const variationNames = Object.keys(variations)
  const result = {} as Record<string, string>
  for (const variationName of variationNames) {
    result[variationName] = item.variationValues[variationName]
  }
  return result
}

function useColorImages(items: SelectorProductItem[], imageText: string) {
  const imageRegex = new RegExp(imageText, 'i')

  return items.map(item => ({ ...item, images: item.images.filter(image => {
    if (!image.imageText) {
      return true
    }
    return imageRegex.test(image.imageText)
  }) }))
}

const useImagesMap = (items: SelectorProductItem[], variations: Variations, thumbnailImage?: string) => {
  return useMemo(() => {
    if (thumbnailImage) {
      items = useColorImages(items, thumbnailImage)
    }

    const variationNames = Object.keys(variations)
    const result: ImageMap = {}
    for (const variationName of variationNames) {
      // Today, only "Color" variation should show image, need to find a more resilient way to tell this, waiting for backend
      if (!isColor(variationName)) {
        continue
      }
      const imageMap = {} as Record<string, Image | undefined>
      const variationValues = variations[variationName]
      for (const variationValue of variationValues) {
        const item = items.find(
          sku => sku.variationValues[variationName] === variationValue
        )
        imageMap[variationValue] = item && head(item.images)
      }
      result[variationName] = imageMap
    }
    return result
  }, [items, variations])
}

const useAllSelectedEvent = (
  selectedVariations: SelectedVariations | null,
  variationsCount: number
) => {
  const dispatch = useProductDispatch()
  useEffect(() => {
    if (dispatch && selectedVariations) {
      const selectedNotNull = filterSelected(selectedVariations)
      const selectedCount = keyCount(selectedNotNull)
      const allSelected = selectedCount === variationsCount
      dispatch({
        type: 'SKU_SELECTOR_SET_VARIATIONS_SELECTED',
        args: { allSelected },
      })
    }
  }, [dispatch, selectedVariations, variationsCount])
}

const useInitialSelection = ({
  skuSelected,
  variations,
  initialSelection,
}: {
  skuSelected?: ProductItem
  variations: Variations
  initialSelection: InitialSelectionType
}) => {
  const { query } = useRuntime()
  const hasSkuInQuery = !!(query && query.skuId)
  return useMemo(() => {
    const emptyVariations = buildEmptySelectedVariation(variations)
    if (!skuSelected) {
      return emptyVariations
    }
    const parsedSku = parseSku(skuSelected)

    if (hasSkuInQuery) {
      return selectedVariationFromItem(parsedSku, variations)
    }

    if (initialSelection === InitialSelectionType.complete) {
      return selectedVariationFromItem(parsedSku, variations)
    }
    if (initialSelection === InitialSelectionType.image) {
      const colorVariationName = parsedSku.variations.find(isColor)
      return {
        ...emptyVariations,
        ...(colorVariationName
          ? {
            [colorVariationName]:
              parsedSku.variationValues[colorVariationName],
          }
          : {}),
      }
    }
    // if here, is value 'empty'
    return emptyVariations
  }, [skuSelected, variations, initialSelection, hasSkuInQuery])
}

interface Props {
  skuItems: ProductItem[]
  onSKUSelected?: (skuId: string) => void
  seeMoreLabel: string
  maxItems?: number
  variations: Variations
  skuSelected?: ProductItem
  hideImpossibleCombinations?: boolean
  showValueNameForImageVariation?: boolean
  imageHeight?: number
  imageWidth?: number
  thumbnailImage?: string
  showVariationsLabels?: boolean
  variationsSpacing?: number
  initialSelection?: InitialSelectionType
}

/**
 * Display a list of SKU items of a product and its specifications.
 */
const SKUSelectorContainer: FC<Props> = ({
  skuItems = [],
  onSKUSelected,
  seeMoreLabel,
  maxItems = 10,
  variations,
  skuSelected,
  hideImpossibleCombinations = true,
  showValueNameForImageVariation = false,
  thumbnailImage,
  imageHeight,
  imageWidth,
  variationsSpacing,
  showVariationsLabels = true,
  initialSelection = InitialSelectionType.empty,
}) => {
  const variationsCount = keyCount(variations)
  const [
    selectedVariations,
    setSelectedVariations,
  ] = useState<SelectedVariations | null>(null)
  useAllSelectedEvent(selectedVariations, variationsCount)

  const parsedItems = useMemo(() => skuItems.map(parseSku), [skuItems])
  const { setQuery } = useRuntime()
  const redirectToSku = (skuId: string) => {
    setQuery(
      { skuId },
      {
        replace: true,
      }
    )
  }

  const initialVariations = useInitialSelection({
    skuSelected,
    variations,
    initialSelection,
  })

  useEffect(() => {
      setSelectedVariations(initialVariations)
    }, [variations])

  useEffect(() => {
    if (skuSelected && onSKUSelected) {
      onSKUSelected(skuSelected.itemId)
    }
  }, [path(['itemId'], skuSelected)])

  const imagesMap = useImagesMap(parsedItems, variations, thumbnailImage)

  const onSelectItem = useCallback(
    ({
      name: variationName,
      value: variationValue,
      skuId,
      isMainAndImpossible,
      possibleItems,
    }) => {
      const isRemoving = selectedVariations![variationName] === variationValue
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
        skuIdToRedirect = newItem!.itemId
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
      imageHeight={imageHeight}
      imageWidth={imageWidth}
      onSelectItem={onSelectItem}
      variationsSpacing={variationsSpacing}
      showVariationsLabels={showVariationsLabels}
      hideImpossibleCombinations={hideImpossibleCombinations}
      showValueNameForImageVariation={showValueNameForImageVariation}
    />
  )
}

export default memo(SKUSelectorContainer)
