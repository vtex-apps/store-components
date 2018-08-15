import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VTEXClasses from './constants/CustomClasses'
import SelectorItem from './components/SelectorItem'

import './global.css'

/**
 * Display a list of SKU items of a problem and its specifications.
 */
export default class SKUSelector extends Component {
  static propTypes = {
    /** Product's slug */
    productSlug: PropTypes.string,
    /** SKU selected */
    skuSelected: PropTypes.object,
    /** Title which describes the SKU Selector Type */
    title: PropTypes.string.isRequired,
    /** List of SKU Items */
    skuItems: PropTypes.arrayOf(PropTypes.shape({
      /** Name of the SKU Item */
      name: PropTypes.string.isRequired,
      /** Images of the SKU item */
      images: PropTypes.arrayOf(PropTypes.shape({
        /** URL of source Image */
        imageUrl: PropTypes.string.isRequired,
        /** Brief description of the image */
        imageLabel: PropTypes.string,
      })).isRequired,
    })).isRequired,
  }

  static defaultProps = {
    title: '',
    skuItems: [],
  }

  getMaxSkuPrice = items => {
    let maxPrice = 0
    if (items) {
      items.forEach(item => {
        const [{ commertialOffer: { Price } }] = item.sellers
        maxPrice = Math.max(maxPrice, Price)
      })
    }
    return maxPrice
  }

  stripUrl = url => url.replace(/^https?:/, '')

  render() {
    const skuItems = this.props.skuItems
    const maxSkuPrice = this.getMaxSkuPrice(skuItems)
    const { productSlug, skuSelected: { itemId: skuSelectedId } } = this.props
    return (
      <div className={`${VTEXClasses.SKU_SELECTOR} flex flex-column`}>
        <div className="ma1">
          <div className="b fabriga overflow-hidden">
            {this.props.title}
          </div>
          <div className="inline-flex flex-wrap">
            {
              skuItems.map(skuItem => {
                if (!skuItem.images.length) return null
                const [skuImage] = skuItem.images
                const [seller] = skuItem.sellers
                return (
                  <SelectorItem
                    isSelected={skuItem.itemId === skuSelectedId}
                    key={skuItem.itemId}
                    isAvailable={seller.commertialOffer.AvailableQuantity > 0}
                    maxPrice={maxSkuPrice}
                    productSlug={productSlug}
                    skuId={skuItem.itemId}
                    price={seller.commertialOffer.Price}>
                    <img
                      src={this.stripUrl(skuImage.imageUrl)}
                      alt={skuImage.imageLabel}
                    />
                  </SelectorItem>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
