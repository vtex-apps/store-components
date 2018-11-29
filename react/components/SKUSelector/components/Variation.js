import React, { Component } from 'react'

import SelectorItem from './SelectorItem'
import { stripUrl, isColor } from '../utils'

export default class Variation extends Component {
  render() {
    const { variation, onSelectItem, maxSkuPrice, isSelected } = this.props

    const shouldDisplayImages = isColor(variation.name)

    return (
      <div className="vtex-sku-selector__container flex flex-column">
        <div className="vtex-sku-selector__name-container ma1">
          <span className="vtex-sku-selector__name b db t-body overflow-hidden">
            {variation.name}
          </span>
          <div className="inline-flex flex-wrap">
            {variation.options.map(skuItem => {
              if (!skuItem.images.length) return null
              const [skuImage] = skuItem.images
              const [seller] = skuItem.sellers
              return (
                <SelectorItem
                  isSelected={isSelected(skuItem)}
                  key={skuItem.itemId}
                  isAvailable={seller.commertialOffer.AvailableQuantity > 0}
                  maxPrice={maxSkuPrice}
                  skuId={skuItem.itemId}
                  price={seller.commertialOffer.Price}
                  onClick={() => onSelectItem(skuItem.itemId)}
                >
                  {shouldDisplayImages ?
                    <img
                      src={stripUrl(skuImage.imageUrl)}
                      alt={skuImage.imageLabel}
                    /> : (
                      <span>{skuItem[variation.name]}</span>
                    )}
                </SelectorItem>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}