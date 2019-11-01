import React, { useMemo, useEffect } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { pathOr, pick } from 'ramda'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import SKUSelector from './index'
import { ProductItem, Variations, InitialSelectionType } from './types'
import { useResponsiveValues } from 'vtex.responsive-values'

const useVariations = (skuItems: ProductItem[], shouldNotShow: boolean, visibleVariations?: string[]) => {
  const result = useMemo(() => {
    if (shouldNotShow || visibleVariations && visibleVariations.length === 0) {
      return {}
    }
    const variations: Variations = {}
    const variationsSet: Record<string, Set<string>> = {}
    if (visibleVariations) {
      visibleVariations = visibleVariations.map(variation => variation.toLowerCase().trim())
    }

    for (const skuItem of skuItems) {
      for (const currentVariation of skuItem.variations) {
        const { name, values } = currentVariation
          if (!visibleVariations || visibleVariations.includes(name.toLowerCase().trim())) {

            const value = values[0]
            const currentSet = variationsSet[name] || new Set()
            currentSet.add(value)
            variationsSet[name] = currentSet
        }
      }
    }
    const variationsNames = Object.keys(variationsSet)
    // Transform set back to array
    for (const variationName of variationsNames) {
      const set = variationsSet[variationName]
      variations[variationName] = Array.from(set)
    }
    return variations
  }, [skuItems, shouldNotShow])
  return result
}

interface Props {
  skuItems: ProductItem[]
  skuSelected: ProductItem
  onSKUSelected?: (skuId: string) => void
  maxItems?: number
  seeMoreLabel: string
  hideImpossibleCombinations?: boolean
  showValueNameForImageVariation?: boolean
  imageHeight?: number | object
  imageWidth?: number | object
  thumbnailImage?: string
  visibleVariations?: string[]
  showVariationsLabels?: boolean
  variationsSpacing?: number
  showVariationsErrorMessage?: boolean
  initialSelection?: InitialSelectionType
}

const SKUSelectorWrapper: StorefrontFC<Props> = props => {
  const valuesFromContext = useProduct()
  const dispatch = useProductDispatch()
  const { imageHeight, imageWidth } = useResponsiveValues(pick(['imageHeight', 'imageWidth'], props))

  const skuItems =
    props.skuItems != null
      ? props.skuItems
      : pathOr<ProductItem[]>([], ['product', 'items'], valuesFromContext)

  const skuSelected =
    props.skuSelected != null
      ? props.skuSelected
      : (valuesFromContext.selectedItem as ProductItem)

  const shouldNotShow =
    skuItems.length === 0 ||
    !skuSelected ||
    !skuSelected.variations ||
    skuSelected.variations.length === 0

  const variations = useVariations(skuItems, shouldNotShow, props.visibleVariations)

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'SKU_SELECTOR_SET_IS_VISIBLE',
        args: { isVisible: !shouldNotShow },
      })
    }
  }, [shouldNotShow, dispatch])

  if (shouldNotShow) {
    return null
  }

  return (
    <SKUSelector
      skuItems={skuItems}
      variations={variations}
      imageWidth={imageWidth}
      skuSelected={skuSelected}
      maxItems={props.maxItems}
      imageHeight={imageHeight}
      seeMoreLabel={props.seeMoreLabel}
      onSKUSelected={props.onSKUSelected}
      thumbnailImage={props.thumbnailImage}
      variationsSpacing={props.variationsSpacing}
      initialSelection={props.initialSelection}
      showVariationsLabels={props.showVariationsLabels}
      hideImpossibleCombinations={props.hideImpossibleCombinations}
      showVariationsErrorMessage={props.showVariationsErrorMessage}
      showValueNameForImageVariation={props.showValueNameForImageVariation}
    />
  )
}

SKUSelectorWrapper.schema = {
  title: 'admin/editor.skuSelector.title',
  description: 'admin/editor.skuSelector.description',
}

export default SKUSelectorWrapper
