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
    /** Brand name */
    brandName: PropTypes.string,
    /** Display large font */
    large: PropTypes.bool,
  }

  static defaultProps = {
    large: false,
  }

  render() {
    const { name, skuName, brandName, large } = this.props

    let brandClasses = 'vtex-product-name__brand'
    let skuClasses = 'vtex-product-name__sku'

    if (large) {
      brandClasses += ' vtex-product-name__brand--large'
      skuClasses += ' vtex-product-name__sku--large'
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
