import React, { Component } from 'react'

import SelectorItem from './SelectorItem'
import { SELECTOR__VARIATION } from '../utils/classes'
import { getMaxSkuPrice, stripUrl, isColor } from '../utils'

export default class Variation extends Component {
  render() {
    const { variation, skus, selectedId, onSelectItem } = this.props

    const shouldDisplayImages = isColor(variation.name)
    const maxSkuPrice = getMaxSkuPrice(skus)

    return (
      <div className={`${SELECTOR__VARIATION} flex flex-column`}>
        <div className="ma1">
          <div className="b fabriga overflow-hidden">
            {variation.name}
          </div>
          <div className="inline-flex flex-wrap">
            {skus.map(skuItem => {
              if (!skuItem.images.length) return null
              const [skuImage] = skuItem.images
              const [seller] = skuItem.sellers
              return (
                <SelectorItem
                  isSelected={skuItem.itemId === selectedId}
                  key={skuItem.itemId}
                  isAvailable={seller.commertialOffer.AvailableQuantity > 0}
                  maxPrice={maxSkuPrice}
                  skuId={skuItem.itemId}
                  price={seller.commertialOffer.Price}
                  onClick={() => onSelectItem({ skuId: skuItem.itemId, variation: skuItem[variation.name] })}
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