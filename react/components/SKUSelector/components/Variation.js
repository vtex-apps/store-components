import PropTypes from 'prop-types'
import React, {
  useCallback,
  memo,
  useContext,
  useState,
  useEffect,
} from 'react'
import { Button } from 'vtex.styleguide'
import { IOMessage } from 'vtex.native-types'
import { ProductContext } from 'vtex.product-context'
import { path, findIndex, propEq, compose } from 'ramda'

import SelectorItem from './SelectorItem'
import { stripUrl, isColor, slug } from '../utils'
import { variationShape } from '../utils/proptypes'

import styles from '../styles.css'
import { imageUrlForSize, VARIATION_IMG_SIZE } from '../../module/images'

const ITEMS_VISIBLE_THRESHOLD = 2

const seeMoreState = name =>
  compose(
    Boolean,
    path(['skuSelector', name, 'seeMore'])
  )

const useShowAll = name => {
  const { state, dispatch } = useContext(ProductContext)
  const contextValue = seeMoreState(name)(state)
  const [showAll, setShowAll] = useState(contextValue)
  const showAllAction = useCallback(() => {
    if (dispatch) {
      dispatch({
        type: 'SKU_SELECTOR_SEE_MORE',
        args: { name },
      })
    }
    setShowAll(true)
  }, [dispatch, name, setShowAll])
  return [showAll, showAllAction]
}

const findSelectedOption = selectedItem =>
  findIndex(propEq('label', selectedItem))

const Variation = ({
  variation,
  maxSkuPrice,
  seeMoreLabel,
  maxItems,
  selectedItem,
}) => {
  const { name, options } = variation
  const [showAll, showAllAction] = useShowAll(name)
  const visibleItemsWhenCollapsed = maxItems - ITEMS_VISIBLE_THRESHOLD
  useEffect(() => {
    const selectedOptionPosition = findSelectedOption(selectedItem)(options)
    if (selectedOptionPosition >= visibleItemsWhenCollapsed) {
      showAllAction()
    }
  }, [])

  const displayImage = isColor(name)

  const shouldCollapse = !showAll && options.length > maxItems

  const overflowQuantity = options.length - visibleItemsWhenCollapsed

  const displayOptions = options.slice(
    0,
    shouldCollapse ? visibleItemsWhenCollapsed : options.length
  )
  const emptyAction = useCallback(() => {}, [])

  return (
    <div
      className={`${styles.skuSelectorSubcontainer} ${
        styles.skuSelectorSubcontainer
      }--${slug(name)} flex flex-column mb7`}
    >
      <div className={`${styles.skuSelectorNameContainer} ma1`}>
        <span
          className={`${
            styles.skuSelectorName
          } c-muted-2 db t-small overflow-hidden mb3`}
        >
          {name}
        </span>
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

Variation.propTypes = {
  /** Variation Object */
  variation: variationShape,
  /** Max price of SKU */
  maxSkuPrice: PropTypes.number,
  seeMoreLabel: PropTypes.string,
  maxItems: PropTypes.number,
  /** Label of selected option in this variation. Example: "Small" */
  selectedItem: PropTypes.string,
}

export default memo(Variation)
