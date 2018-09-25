import React, { Component } from 'react'

import Variation from './Variation'
import VTEXClasses from '../utils/classes'

export default class SKUSelector extends Component {
  render() {
    const { selectedId, skus, onSelectSku, onSelectMainVariation, mainVariation, secondaryVariation } = this.props

    console.log("secondary", secondaryVariation)

    return (
      <div className={`${VTEXClasses.SKU_SELECTOR}`}>
        <Variation
          variation={mainVariation}
          onSelectItem={(values) => onSelectMainVariation(values.variation)}
          selectedId={selectedId}
          skus={skus}
        />
        {secondaryVariation.name && <Variation
          variation={secondaryVariation}
          onSelectItem={(values) => onSelectSku(values.skuId)}
          selectedId={selectedId}
          skus={skus}
        />}
      </div>
    )
  }
}