import React, { useCallback, memo, useState, useEffect, FC } from 'react'

import Variation from './Variation'

import { compose, flip, gt, filter, path, pathOr, clone } from 'ramda'

import styles from '../styles.css'
import {
  findItemWithSelectedVariations,
  findListItemsWithSelectedVariations,
  isColor,
} from '../utils'
import {
  SelectorProductItem,
  CallbackItem,
  SelectedVariations,
  ImageMap,
  DisplayOption,
  DisplayVariation,
  Variations,
} from '../types'

interface Props {
  seeMoreLabel: string
  maxItems: number
  variations: Variations
  skuItems: SelectorProductItem[]
  onSelectItem: (callbackItem: CallbackItem) => void
  imagesMap: ImageMap
  selectedVariations: Record<string, string | null>
  hideImpossibleCombinations: boolean
  showValueNameForImageVariation: boolean
  imageHeight?: string | number
  imageWidth?: string | number
}

const isSkuAvailable = compose<
  SelectorProductItem | undefined,
  number,
  boolean
>(
  flip(gt)(0),
  pathOr(0, ['sellers', '0', 'commertialOffer', 'AvailableQuantity'])
)

const showItemAsAvailable = (
  possibleItems: SelectorProductItem[],
  selectedVariations: SelectedVariations,
  variationCount: number,
  isSelected: boolean
) => {
  const selectedNotNull = filter(Boolean, selectedVariations)
  const selectedCount = Object.keys(selectedNotNull).length
  if (selectedCount === variationCount && isSelected) {
    const item = findItemWithSelectedVariations(
      possibleItems,
      selectedVariations
    )
    return isSkuAvailable(item)
  }
  return possibleItems.some(isSkuAvailable)
}

interface AvailableVariationParams {
  variations: Variations
  selectedVariations: SelectedVariations
  imagesMap: ImageMap
  onSelectItemMemo: (callbackItem: CallbackItem) => () => void
  skuItems: SelectorProductItem[]
  hideImpossibleCombinations: boolean
}

const parseOptionNameToDisplayOption = ({
  selectedVariations,
  variationName,
  skuItems,
  onSelectItemMemo,
  imagesMap,
  variationCount,
  hideImpossibleCombinations,
}: {
  selectedVariations: SelectedVariations
  variationName: string
  skuItems: SelectorProductItem[]
  onSelectItemMemo: (callbackItem: CallbackItem) => () => void
  imagesMap: ImageMap
  variationCount: number
  hideImpossibleCombinations: boolean
}) => (variationValue: string): DisplayOption | null => {
  const isSelected = selectedVariations[variationName] === variationValue

  const newSelectedVariation = clone(selectedVariations)
  newSelectedVariation[variationName] = isSelected ? null : variationValue

  const possibleItems = findListItemsWithSelectedVariations(
    skuItems,
    newSelectedVariation
  )
  if (possibleItems.length > 0) {
    // This is a valid combination option
    const [item] = possibleItems
    const callbackFn = onSelectItemMemo({
      name: variationName,
      value: variationValue,
      skuId: item.itemId,
      isMainAndImpossible: false,
      possibleItems,
    })
    return {
      label: variationValue,
      onSelectItem: callbackFn,
      image: path([variationName, variationValue], imagesMap),
      available: showItemAsAvailable(
        possibleItems,
        selectedVariations,
        variationCount,
        isSelected
      ),
      impossible: false,
    }
  }
  if (hideImpossibleCombinations && isColor(variationName)) {
    // This is a visual (with picture) variation and should not be hidden.
    // If the hideImpossibleCombinations is true, we should display it as normal but when pressed it will reset the selected variations.
    const callbackFn = onSelectItemMemo({
      name: variationName,
      value: variationValue,
      skuId: null,
      isMainAndImpossible: true,
      possibleItems: skuItems,
    })
    return {
      label: variationValue,
      onSelectItem: callbackFn,
      image: path([variationName, variationValue], imagesMap),
      available: true,
      impossible: false,
    }
  }
  if (!hideImpossibleCombinations) {
    // This is a impossible combination and will only appear if the prop allows.
    return {
      label: variationValue,
      onSelectItem: () => {},
      image: path([variationName, variationValue], imagesMap),
      available: true,
      impossible: true,
    }
  }
  // This is a impossible combination and will be hidden.
  return null
}

const variationNameToDisplayVariation = ({
  variations,
  selectedVariations,
  skuItems,
  onSelectItemMemo,
  imagesMap,
  variationCount,
  hideImpossibleCombinations,
}: {
  variations: Variations
  selectedVariations: SelectedVariations
  skuItems: SelectorProductItem[]
  imagesMap: ImageMap
  onSelectItemMemo: (callbackItem: CallbackItem) => () => void
  variationCount: number
  hideImpossibleCombinations: boolean
}) => (variationName: string): DisplayVariation => {
  const name = variationName
  const values = variations[variationName]
  const options = values
    .map(
      parseOptionNameToDisplayOption({
        selectedVariations,
        variationName,
        skuItems,
        onSelectItemMemo,
        imagesMap,
        variationCount,
        hideImpossibleCombinations,
      })
    )
    .filter(Boolean) as DisplayOption[]
  return { name, options }
}

// Parameters are explained on PropTypes
const getAvailableVariations = ({
  variations,
  selectedVariations,
  imagesMap,
  onSelectItemMemo,
  skuItems,
  hideImpossibleCombinations,
}: AvailableVariationParams): Promise<DisplayVariation[]> => {
  const variationCount = Object.keys(variations).length
  return new Promise(resolve => {
    const result = Object.keys(variations).map(
      variationNameToDisplayVariation({
        variations,
        selectedVariations,
        skuItems,
        onSelectItemMemo,
        imagesMap,
        variationCount,
        hideImpossibleCombinations,
      })
    )
    resolve(result)
  })
}

/** Renders the main and the secondary variation, if it exists. */
const SKUSelector: FC<Props> = ({
  seeMoreLabel,
  maxItems,
  variations,
  skuItems,
  onSelectItem,
  imagesMap,
  imageHeight,
  imageWidth,
  selectedVariations,
  hideImpossibleCombinations,
  showValueNameForImageVariation,
}) => {
  const [displayVariations, setDisplayVariations] = useState<
    DisplayVariation[] | null
  >(null)
  const onSelectItemMemo = useCallback(
    ({
      name,
      value,
      skuId,
      isMainAndImpossible,
      possibleItems,
    }: CallbackItem) => () =>
      onSelectItem({ name, value, skuId, isMainAndImpossible, possibleItems }),
    [onSelectItem]
  )
  useEffect(() => {
    let isCurrent = true
    const promise = getAvailableVariations({
      variations,
      selectedVariations,
      imagesMap,
      onSelectItemMemo,
      skuItems,
      hideImpossibleCombinations,
    })

    promise.then(availableVariations => {
      if (isCurrent) {
        setDisplayVariations(availableVariations)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [
    variations,
    selectedVariations,
    imagesMap,
    onSelectItemMemo,
    skuItems,
    hideImpossibleCombinations,
  ])

  if (!displayVariations) {
    return null
  }
  return (
    <div className={styles.skuSelectorContainer}>
      {displayVariations.map((variationOption, index) => {
        const selectedItem = selectedVariations[variationOption.name]
        return (
          <Variation
            key={`${variationOption.name}-${index}`}
            variation={variationOption}
            selectedItem={selectedItem}
            maxItems={maxItems}
            seeMoreLabel={seeMoreLabel}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            showValueNameForImageVariation={showValueNameForImageVariation}
          />
        )
      })}
    </div>
  )
}

export default memo(SKUSelector)
