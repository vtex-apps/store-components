import PropTypes from 'prop-types'
import React, { useCallback, memo } from 'react'

import Variation from './Variation'
import { variationShape } from '../utils/proptypes'

import styles from '../styles.css'

/** Renders the main and the secondary variation, if it exists. */
const SKUSelector = ({
  onSelectSKU,
  mainVariation,
  secondaryVariation,
  maxSkuPrice,
  alwaysShowSecondary,
  seeMoreLabel,
  maxItems,
}) => {
  if (!mainVariation) return null

  const shouldShowSecondary =
    (alwaysShowSecondary || mainVariation.value) && secondaryVariation.name

  return (
    <div className={styles.skuSelectorContainer}>
      <Variation
        variation={mainVariation}
        onSelectItem={useCallback(skuId => onSelectSKU(true, skuId), [])}
        isSelected={useCallback(sku => sku[mainVariation.name] === mainVariation.value, [mainVariation])}
        maxSkuPrice={maxSkuPrice}
        seeMoreLabel={seeMoreLabel}
        maxItems={maxItems}
      />
      {shouldShowSecondary && (
        <Variation
          variation={secondaryVariation}
          onSelectItem={useCallback(skuId => onSelectSKU(false, skuId), [])}
          isSelected={useCallback(sku => sku.itemId === secondaryVariation.value, [secondaryVariation])}
          maxSkuPrice={maxSkuPrice}
          seeMoreLabel={seeMoreLabel}
          maxItems={maxItems}
        />
      )}
    </div>
  )
}

SKUSelector.propTypes = {
  /** Function to go to the product page of a given sku */
  onSelectSKU: PropTypes.func.isRequired,
  /** Name and list of options of the main variation */
  mainVariation: variationShape,
  /** Name and list of options of the secondary variation */
  secondaryVariation: variationShape,
  /** Max price find on the sku list */
  maxSkuPrice: PropTypes.number.isRequired,
  /** If true, show secondary options (if present), even when main variation is not picked yet */
  alwaysShowSecondary: PropTypes.bool,
  seeMoreLabel: PropTypes.string,
  maxItems: PropTypes.number,
}

export default memo(SKUSelector)
