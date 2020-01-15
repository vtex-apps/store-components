import React, { useMemo, useEffect } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { pick } from 'ramda'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
import {
  MaybeResponsiveInput,
  ResponsiveInput,
  useResponsiveValues,
} from 'vtex.responsive-values'

import SKUSelector from './index'
import { Variations, InitialSelectionType, DisplayMode } from './types'
import { ShowValueForVariation } from './components/SKUSelector'

const useVariations = (skuSpecifications: SkuSpecification[]) => {
  const result = useMemo(() => {
    const variations: Variations = {}
    for (const specification of skuSpecifications) {
      variations[specification.field.name] = specification.values.map(
        value => value.name
      )
    }
    return variations
  }, [skuSpecifications])
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
  showValueForVariation?: ShowValueForVariation
  imageHeight?: MaybeResponsiveInput<number>
  imageWidth?: MaybeResponsiveInput<number>
  thumbnailImage?: string
  visibleVariations?: string[]
  showVariationsLabels?: boolean
  variationsSpacing?: number
  showVariationsErrorMessage?: boolean
  initialSelection?: InitialSelectionType
  displayMode?: MaybeResponsiveInput<DisplayMode>
  sliderDisplayThreshold?: number
  sliderArrowSize?: number
  sliderItemsPerPage?: ResponsiveInput<number>
}

const SKUSelectorWrapper: StorefrontFC<Props> = props => {
  const valuesFromContext = useProduct()
  const dispatch = useProductDispatch()
  const { imageHeight, imageWidth } = useResponsiveValues(
    pick(['imageHeight', 'imageWidth'], props)
  )
  const skuItems =
    props.skuItems != null
      ? props.skuItems
      : valuesFromContext?.product?.items ?? []

  const skuSelected =
    props.skuSelected != null
      ? props.skuSelected
      : valuesFromContext.selectedItem

  const shouldNotShow =
    skuItems.length === 0 ||
    !skuSelected?.variations ||
    skuSelected.variations.length === 0

  const skuSpecifications = valuesFromContext?.product?.skuSpecifications ?? []
  const variations = useVariations(skuSpecifications)

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'SKU_SELECTOR_SET_IS_VISIBLE',
        args: { isVisible: !shouldNotShow },
      })
    }
  }, [shouldNotShow, dispatch])

  if (shouldNotShow || !skuSelected) {
    return null
  }

  let showValueForVariation = ShowValueForVariation.none
  if (props.showValueForVariation) {
    showValueForVariation = props.showValueForVariation
  } else if (props.showValueNameForImageVariation) {
    showValueForVariation = ShowValueForVariation.image
  }

  return (
    <SKUSelector
      skuItems={skuItems}
      variations={variations}
      imageWidth={imageWidth}
      skuSelected={skuSelected}
      maxItems={props.maxItems}
      imageHeight={imageHeight}
      displayMode={props.displayMode}
      seeMoreLabel={props.seeMoreLabel}
      onSKUSelected={props.onSKUSelected}
      thumbnailImage={props.thumbnailImage}
      initialSelection={props.initialSelection}
      variationsSpacing={props.variationsSpacing}
      showValueForVariation={showValueForVariation}
      showVariationsLabels={props.showVariationsLabels}
      hideImpossibleCombinations={props.hideImpossibleCombinations}
      showVariationsErrorMessage={props.showVariationsErrorMessage}
      sliderItemsPerPage={props.sliderItemsPerPage}
      sliderArrowSize={props.sliderArrowSize}
      sliderDisplayThreshold={props.sliderDisplayThreshold}
    />
  )
}

SKUSelectorWrapper.schema = {
  title: 'admin/editor.skuSelector.title',
  description: 'admin/editor.skuSelector.description',
}

export default SKUSelectorWrapper
