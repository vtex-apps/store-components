import React, { memo, SyntheticEvent, useMemo } from 'react'
import classNames from 'classnames'
import { FormattedNumber } from 'react-intl'

import { useSKUSelectorCssHandles } from '../SKUSelectorCssHandles'
import { slug, changeImageUrlSize } from '../utils'

interface Props {
  isAvailable: boolean
  isSelected: boolean
  maxPrice?: number | null
  price?: number | null
  onClick: (e: SyntheticEvent<HTMLDivElement>) => void
  isImage: boolean
  variationValue: string
  variationValueOriginalName: string
  imageUrl?: string
  imageLabel?: string | null
  isImpossible: boolean
  imageHeight?: number | string
  imageWidth?: number | string
  showBorders?: boolean
  variationLabel: string
  label: string
}

const getDiscount = (maxPrice?: number | null, price?: number | null) => {
  let discount = 0

  if (maxPrice && price) {
    discount = 1 - price / maxPrice
  }

  return discount
}

export const CSS_HANDLES = [
  'frameAround',
  'valueWrapper',
  'diagonalCross',
  'skuSelectorItem',
  'skuSelectorBadge',
  'skuSelectorItemImage',
  'skuSelectorInternalBox',
  'skuSelectorItemTextValue',
  'skuSelectorItemImageValue',
] as const

/**
 * Inherits the components that should be displayed inside the Selector component.
 */
function SelectorItem({
  isAvailable = true,
  isSelected = false,
  maxPrice,
  price,
  onClick,
  isImage,
  variationValue,
  variationValueOriginalName,
  imageUrl,
  imageLabel,
  isImpossible,
  imageHeight,
  imageWidth,
  showBorders = true,
  variationLabel,
  label,
}: Props) {
  const discount = getDiscount(maxPrice, price)
  const { handles, withModifiers } = useSKUSelectorCssHandles()

  const containerClasses = useMemo(
    () =>
      classNames(
        withModifiers('skuSelectorItem', [
          slug(variationValueOriginalName),
          isSelected ? 'selected' : '',
        ]),
        'relative di pointer flex items-center outline-0 ma2',
        {
          [`${handles.skuSelectorItemImage}`]: isImage,
          'o-20': isImpossible,
        }
      ),
    [
      isImage,
      isSelected,
      isImpossible,
      variationValueOriginalName,
      withModifiers,
      handles.skuSelectorItemImage,
    ]
  )

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const passedAnyDimension = Boolean(imageHeight || imageWidth)
  let containerStyles = {}

  if (isImage && passedAnyDimension && imageUrl) {
    containerStyles = {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      height: imageHeight || 'auto',
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      width: imageWidth || 'auto',
      padding: 0,
    }
    imageUrl = changeImageUrlSize(imageUrl, imageWidth, imageHeight)
  }

  let itemTextValue = variationValue

  if (
    variationLabel === 'itemValue' ||
    variationLabel === 'variationAndItemValue'
  ) {
    itemTextValue = `${label} ${variationValue}`
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      style={containerStyles}
      className={containerClasses}
      onKeyDown={e => e.key === 'Enter' && onClick(e)}
    >
      <div
        className={classNames(
          handles.frameAround,
          'absolute b--action-primary br3 bw1',
          {
            ba: isSelected,
          }
        )}
      />
      <div
        className={classNames(
          handles.skuSelectorInternalBox,
          'w-100 h-100 b--muted-4 br2 b z-1 c-muted-5 flex items-center overflow-hidden',
          {
            'hover-b--muted-2': !isSelected && !isImpossible,
            ba: showBorders,
          }
        )}
      >
        <div
          className={classNames('absolute absolute--fill', {
            [handles.diagonalCross]: !isAvailable,
          })}
        />
        <div
          className={classNames(handles.valueWrapper, {
            [`${handles.skuSelectorItemTextValue} c-on-base center pl5 pr5 z-1 t-body`]: !isImage,
            'h-100': isImage,
          })}
        >
          {isImage && imageUrl ? (
            <img
              className={handles.skuSelectorItemImageValue}
              src={imageUrl}
              alt={imageLabel as string | undefined}
            />
          ) : (
            itemTextValue
          )}
        </div>
      </div>
      {discount > 0 && (
        <span className={`${handles.skuSelectorBadge} b`}>
          <FormattedNumber value={discount} style="percent" />
        </span>
      )}
    </div>
  )
}

export default memo(SelectorItem)
