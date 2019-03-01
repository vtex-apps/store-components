import React, { Component } from 'react'
import { curry } from 'ramda'

import Variation from './Variation'
import { SKUSelectorPropTypes } from '../utils/proptypes'

import styles from '../styles.css'

/** Renders the main and the secondary variation, if it exists. */
export default class SKUSelector extends Component {
  shouldShowSecondary = () => {
    const { alwaysShowSecondary, secondaryVariation, mainVariation } = this.props
    const hasSecondary = !!secondaryVariation.name
    if (alwaysShowSecondary && hasSecondary) {
      return true
    }
    return hasSecondary && !!mainVariation.value
  }

  render() {
    const { onSelectSku, mainVariation, secondaryVariation, maxSkuPrice } = this.props

    if (!mainVariation) return null

    const onSkuSelected = curry(onSelectSku) 

    return (
      <div className={styles.skuSelectorContainer}>
        <Variation
          variation={mainVariation}
          onSelectItem={onSkuSelected(true)}
          isSelected={sku => sku[mainVariation.name] === mainVariation.value}
          maxSkuPrice={maxSkuPrice}
        />
        {
          this.shouldShowSecondary() && <Variation
            variation={secondaryVariation}
            onSelectItem={onSkuSelected(false)}
            isSelected={sku => sku.itemId === secondaryVariation.value}
            maxSkuPrice={maxSkuPrice}
          />
        }
      </div>
    )
  }
}

SKUSelector.propTypes = SKUSelectorPropTypes
