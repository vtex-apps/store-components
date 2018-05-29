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
    /** EAN */
    ean: PropTypes.string,
    /** Show EAN */
    showEAN: PropTypes.bool,
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
    showEAN: true,
  }

  render() {
    const { name, skuName, brandName, large, showBrandName, showEAN, ean } = this.props

    let brandClasses = 'vtex-product-name__brand'
    let skuClasses = 'vtex-product-name__sku'

    if (large) {
      brandClasses += ' vtex-product-name__brand--large'
      skuClasses += ' vtex-product-name__sku--large'
    }

    return (
      <div className="vtex-product-name">
        <div className={brandClasses}>
          {name} {showBrandName && brandName && `(${brandName})`}
        </div>
        <div className={skuClasses}>{skuName}</div>
        {showEAN && ean && <div className="vtex-product-name__ean pt3 f7 ttu gray">{`(EAN ${ean})`}</div>}
      </div>
    )
  }
}

export default ProductName
