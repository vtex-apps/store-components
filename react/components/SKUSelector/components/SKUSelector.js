import React, { Component } from 'react'

import Variation from './Variation'
import { SKUSelectorPropTypes } from '../utils/proptypes'

import styles from '../styles.css'

/** Renders the main and the secondary variation, if it exists. */
export default class SKUSelector extends Component {
  render() {
    const { selectedId, onSelectSku, mainVariation, secondaryVariation, maxSkuPrice } = this.props

    return (
      <div className={styles.skuSelectorContainer}>
        <Variation
          variation={mainVariation}
          onSelectItem={onSelectSku}
          isSelected={(sku) => { return sku[mainVariation.name] === mainVariation.value }}
          maxSkuPrice={maxSkuPrice}
        />
        {
          secondaryVariation.name && <Variation
            variation={secondaryVariation}
            onSelectItem={onSelectSku}
            isSelected={sku => sku.itemId === selectedId}
            maxSkuPrice={maxSkuPrice}
          />
        }
      </div>
    )
  }
}

SKUSelector.propTypes = SKUSelectorPropTypes
