import React, {
  FC,
  memo,
  useState,
  Fragment,
  useEffect,
  useCallback,
} from 'react'
import { Button } from 'vtex.styleguide'
import { IOMessage } from 'vtex.native-types'
import { findIndex, propEq } from 'ramda'
import classnames from 'classnames'
import useProduct from 'vtex.product-context/useProduct'

import SelectorItem from './SelectorItem'
import SelectModeVariation from './SelectVariationMode'
import { stripUrl, isColor, slug } from '../utils'

import styles from '../styles.css'
import ErrorMessage from './ErrorMessage'
import { DisplayVariation, DisplayMode } from '../types'
import { imageUrlForSize, VARIATION_IMG_SIZE } from '../../module/images'

interface Props {
  variation: DisplayVariation
  maxSkuPrice?: number | null
  seeMoreLabel: string
  maxItems: number
  selectedItem: string | null
  showValueNameForImageVariation: boolean
  imageHeight?: number
  imageWidth?: number
  showBorders?: boolean
  showLabel: boolean
  containerClasses?: string
  showErrorMessage: boolean
  mode?: string
}

const ITEMS_VISIBLE_THRESHOLD = 2

const findSelectedOption = (selectedItem: string | null) =>
  findIndex(propEq('label', selectedItem))

const noop = () => { }

const Variation: FC<Props> = ({
  mode = 'default',
  maxItems,
  showLabel,
  variation,
  imageWidth,
  imageHeight,
  showBorders,
  maxSkuPrice,
  seeMoreLabel,
  selectedItem,
  showErrorMessage,
  showValueNameForImageVariation,
  containerClasses: containerClassesProp,
}) => {
  const { name, options } = variation
  const [showAll, setShowAll] = useState(false)
  const visibleItemsWhenCollapsed = maxItems - ITEMS_VISIBLE_THRESHOLD
  const {
    buyButton = {
      clicked: false,
    }
  } = useProduct()

  useEffect(() => {
    const selectedOptionPosition = findSelectedOption(selectedItem)(options)
    if (selectedOptionPosition >= visibleItemsWhenCollapsed) {
      setShowAll(true)
    }
  }, [])

  const displayImage = isColor(name)

  const shouldCollapse = !showAll && options.length > maxItems

  const overflowQuantity = options.length - visibleItemsWhenCollapsed
  const displayOptions = options.slice(
    0,
    shouldCollapse ? visibleItemsWhenCollapsed : options.length
  )
  const showAllAction = useCallback(() => setShowAll(true), [setShowAll])
  const containerClasses = classnames(
    'flex flex-column',
    containerClassesProp,
    styles.skuSelectorSubcontainer,
    `${styles.skuSelectorSubcontainer}--${slug(name)}`,
  )

  return (
    <div className={containerClasses}>
      <div className={`${styles.skuSelectorNameContainer} ma1`}>
        <div className={`${styles.skuSelectorTextContainer} db mb3`}>
          {showLabel && (<span
            className={`${
              styles.skuSelectorName
              } c-muted-1 t-small overflow-hidden`}
          >
            {name} {showErrorMessage && buyButton.clicked && !selectedItem && (<ErrorMessage />)}
          </span>)}
          {displayImage && selectedItem && showValueNameForImageVariation && (
            <Fragment>
              <span className={styles.skuSelectorNameSeparator}>: </span>
              <span
                className={`${
                  styles.skuSelectorSelectorImageValue
                  } c-muted-1 t-small`}
              >
                {selectedItem}
              </span>
            </Fragment>
          )}
        </div>
        <div className={`${styles.skuSelectorOptionsList} inline-flex flex-wrap ml2 flex items-center`}>
          {mode === DisplayMode.select && !displayImage ? (
            <SelectModeVariation
              selectedItem={selectedItem}
              displayOptions={displayOptions}
            />
          ) : displayOptions.map(option => {
            return (
              <SelectorItem
                isSelected={option.label === selectedItem}
                key={`${option.label}-${name}`}
                isAvailable={option.available}
                maxPrice={maxSkuPrice}
                onClick={option.impossible ? noop : option.onSelectItem}
                isImage={displayImage}
                variationValue={option.label}
                imageHeight={imageHeight}
                imageWidth={imageWidth}
                showBorders={showBorders}
                imageUrl={
                  option.image &&
                  imageUrlForSize(
                    stripUrl(option.image.imageUrl),
                    VARIATION_IMG_SIZE
                  )
                }
                imageLabel={option.image && option.image.imageLabel}
                isImpossible={option.impossible}
              />
            )
          })}
          {!showAll && shouldCollapse && (
            <div className={styles.seeMoreButton}>
              <Button
                variation="tertiary"
                onClick={showAllAction}
                size="small"
                collapseLeft
              >
                <IOMessage
                  id={seeMoreLabel}
                  values={{ quantity: overflowQuantity }}
                  data-testid="seeMoreLabel"
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Variation)
