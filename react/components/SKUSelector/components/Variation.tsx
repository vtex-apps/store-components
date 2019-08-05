import React, {
  useCallback,
  memo,
  useState,
  useEffect,
  FC,
  Fragment,
} from 'react'
import { Button } from 'vtex.styleguide'
import { IOMessage } from 'vtex.native-types'
import { findIndex, propEq } from 'ramda'

import SelectorItem from './SelectorItem'
import { stripUrl, isColor, slug } from '../utils'

import styles from '../styles.css'
import { imageUrlForSize, VARIATION_IMG_SIZE } from '../../module/images'
import { DisplayVariation } from '../types'

interface Props {
  variation: DisplayVariation
  maxSkuPrice?: number | null
  seeMoreLabel: string
  maxItems: number
  selectedItem: string | null
  showValueNameForImageVariation: boolean
}

const ITEMS_VISIBLE_THRESHOLD = 2

const findSelectedOption = (selectedItem: string | null) =>
  findIndex(propEq('label', selectedItem))

const Variation: FC<Props> = ({
  variation,
  maxSkuPrice,
  seeMoreLabel,
  maxItems,
  selectedItem,
  showValueNameForImageVariation,
}) => {
  const { name, options } = variation
  const [showAll, setShowAll] = useState(false)
  const visibleItemsWhenCollapsed = maxItems - ITEMS_VISIBLE_THRESHOLD

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
  const emptyAction = useCallback(() => {}, [])

  return (
    <div
      className={`${styles.skuSelectorSubcontainer} ${
        styles.skuSelectorSubcontainer
      }--${slug(name)} flex flex-column mb7`}
    >
      <div className={`${styles.skuSelectorNameContainer} ma1`}>
        <div className={`${styles.skuSelectorTextContainer} db mb3`}>
          <span
            className={`${
              styles.skuSelectorName
            } c-muted-1 t-small overflow-hidden`}
          >
            {name}
          </span>
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
        <div className="inline-flex flex-wrap ml2 flex items-center">
          {displayOptions.map(option => {
            return (
              <SelectorItem
                isSelected={option.label === selectedItem}
                key={`${option.label}-${name}`}
                isAvailable={option.available}
                maxPrice={maxSkuPrice}
                onClick={option.impossible ? emptyAction : option.onSelectItem}
                isImage={displayImage}
                variationValue={option.label}
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
