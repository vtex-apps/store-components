import React, { Component } from 'react'

import Variation from './Variation'
import VTEXClasses from '../utils/classes'
import { SKUSelectorPropTypes } from '../utils/proptypes'


/** Renders the main and the secondary variation, if it exists. */
export default class SKUSelector extends Component {
  render() {
    const { selectedId, onSelectSku, mainVariation, secondaryVariation, maxSkuPrice } = this.props

    return (
      <div className={`${VTEXClasses.SKU_SELECTOR}`}>
        <Variation
          variation={mainVariation}
          onSelectItem={onSelectSku}
          isSelected={(sku) => { return sku[mainVariation.name] === mainVariation.value }}
          maxSkuPrice={maxSkuPrice}
        />
        {secondaryVariation.name && <Variation
          variation={secondaryVariation}
          onSelectItem={onSelectSku}
          isSelected={sku => sku.itemId === selectedId}
          maxSkuPrice={maxSkuPrice}
        />}
      </div>
    )
  }
}

SKUSelector.propTypes = SKUSelectorPropTypes