import React, { Component } from 'react'

import SelectorItem from './SelectorItem'
import { stripUrl, isColor } from '../utils'

import styles from '../styles.css'

export default class Variation extends Component {
  render() {
    const { variation, onSelectItem, maxSkuPrice, isSelected } = this.props

    const displayImage = isColor(variation.name)

    return (
      <div className={`${styles.skuSelectorSubcontainer} flex flex-column mb7`}>
        <div className={`${styles.skuSelectorNameContainer} ma1`}>
          <span className={`${styles.skuSelectorName} c-muted-2 db t-small overflow-hidden mb3`}>
            {variation.name}
          </span>
          <div className="inline-flex flex-wrap ml2">
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
                  isImage={displayImage}
                >
                  {displayImage
                    ? <img
                      src={stripUrl(skuImage.imageUrl)}
                      alt={skuImage.imageLabel}
                    /> : (
                      <span className="c-on-base t-body" >{skuItem[variation.name]}</span>
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
