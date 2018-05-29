import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './product-name.css'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class ProductName extends Component {
  static propTypes = {
    /** Name of the product */
    name: PropTypes.string.isRequired,
    /** Selected SKU name */
    skuName: PropTypes.string,
    /** Show SKU name */
    showSkuName: PropTypes.bool,
    /** Brand name */
    brandName: PropTypes.string,
    /** Show brand name */
    showBrandName: PropTypes.bool,
    /** Display large font */
    large: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
    showBrandName: true,
    showSkuName: true,
  }

  render() {
    const { name, skuName, brandName, large, showBrandName, showSkuName } = this.props

    const hiden = 'vtex-product-name--hiden'
    let brandClasses = 'vtex-product-name__brand'
    let skuClasses = 'vtex-product-name__sku'

    if (large) {
      brandClasses += ' vtex-product-name__brand--large'
      skuClasses += ' vtex-product-name__sku--large'
    }

    if (!showBrandName) {
      brandClasses += ` ${hiden}`
    }

    if (!showSkuName) {
      skuClasses += ` ${hiden}`
    }

    return (
      <div className="vtex-product-name">
        <div className={brandClasses}>
          {name} {brandName && `(${brandName})`}
        </div>
        <div className={skuClasses}>{skuName}</div>
      </div>
    )
  }
}

export default ProductName
