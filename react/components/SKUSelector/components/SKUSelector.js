import PropTypes from 'prop-types'
import React, { useCallback, memo, useState, useEffect } from 'react'

import Variation from './Variation'

import { compose, flip, gt, filter, path, clone } from 'ramda'

import styles from '../styles.css'
import { variationShape, skuShape } from '../utils/proptypes'
import { findItemWithSelectedVariations, findListItemsWithSelectedVariations, isColor } from '../utils'

const isSkuAvailable = compose(flip(gt)(0), path(['sellers', '0', 'commertialOffer', 'AvailableQuantity']))

const showItemAsAvailable = (possibleItems, selectedVariations, variationCount, isSelected) => {
  const selectedNotNull = filter(Boolean, selectedVariations)
  const selectedCount = Object.keys(selectedNotNull).length
  if (selectedCount === variationCount && isSelected) {
    const item = findItemWithSelectedVariations(possibleItems, selectedVariations)
    return isSkuAvailable(item)
  }
  return possibleItems.some(isSkuAvailable)
}

const getAvailableVariations = ({ variations, selectedVariations, imagesMap, onSelectItemMemo, skuItems, hideImpossibleCombinations }) => {
  const variationCount = Object.keys(variations).length
  return new Promise(resolve => {
    const result = Object.keys(variations).map((variationName) => {
      const name = variationName
      const values = variations[variationName]
      const options = values.map(variationValue => {
        const isSelected = selectedVariations[variationName] === variationValue

        const newSelectedVariation = clone(selectedVariations)
        newSelectedVariation[variationName] = isSelected ? null : variationValue

        const possibleItems = findListItemsWithSelectedVariations(skuItems, newSelectedVariation)
        if (possibleItems.length > 0) {
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
            available: showItemAsAvailable(possibleItems, selectedVariations, variationCount, isSelected),
            faded: false,
          }
        }
        if (hideImpossibleCombinations && isColor(variationName)) {
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
            faded: false,
          }
        }
        if (!hideImpossibleCombinations) {
          return {
            label: variationValue,
            onSelectItem: () => {},
            image: path([variationName, variationValue], imagesMap),
            available: true,
            faded: true,
          }
        }
        return null
      }).filter(Boolean)
      return { name, options }
    })
    resolve(result)
  })
}

/** Renders the main and the secondary variation, if it exists. */
const SKUSelector = ({
  seeMoreLabel,
  maxItems,
  variations,
  skuItems,
  onSelectItem,
  imagesMap,
  selectedVariations,
  hideImpossibleCombinations,
}) => {
  const [displayVariations, setDisplayVariations] = useState(null)
  const onSelectItemMemo = useCallback(
    ({ name, value, skuId, isMainAndImpossible, possibleItems }) => () => onSelectItem({ name, value, skuId, isMainAndImpossible, possibleItems}), 
    [onSelectItem]
  )
  useEffect(() => {
    const promise =
      getAvailableVariations({variations, selectedVariations, imagesMap, onSelectItemMemo, skuItems, hideImpossibleCombinations})
    
    promise.then(availableVariations => setDisplayVariations(availableVariations))
  }, [variations, selectedVariations, imagesMap, onSelectItemMemo, skuItems, hideImpossibleCombinations])

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
          />
        )
      })}
    </div>
  )
}

SKUSelector.propTypes = {
  /** Function to go to the product page of a given sku */
  onSelectSKU: PropTypes.func,
  seeMoreLabel: PropTypes.string,
  maxItems: PropTypes.number,
  // Variations object
  variations: variationShape,
  skuItems: PropTypes.arrayOf(skuShape),
  /** Object with dynamic keys, with keys being the name of variations its values being value of the selected variation for that variation name.
   * Example: { "size": "small", "color": null }
   */
  selectedVariations: PropTypes.object,
  /** Object with dynamic keys, with each key being a variation name (that can display image), 
   * mapping to another object with keys of variation values that map to the image object of that variation value 
   * Example: { "color": { "black": { imageUrl: x, imageLabel: y }, "blue": { ... } }*/
  imagesMap: PropTypes.object,
  /** Function to be called when variation option is pressed. 
   * Receives three args: 
   * name (string) the name of the pressed variation, eg: color
   * value (string) the value of the selected variaiton, eg: "black"
   * skuId (string) skuId that is being selected when variation option is being pressed. Used to redirect page.
   * Returns void.*/
  onSelectItem: PropTypes.func,
  /** If true, if a variation option leads to a combination that does not exist, that option won't appear */
  hideImpossibleCombinations: PropTypes.bool,

}

export default memo(SKUSelector)
