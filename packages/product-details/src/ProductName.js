import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class ProductName extends Component {
  render() {
    const { name, skuName, brandName } = this.props

    return (
      <div className="vtex-product-name overflow-hidden">
        <div className="f5 truncate">
          {name} {brandName && `(${brandName})`}
        </div>
        <div className="f6 truncate">{skuName}</div>
      </div>
    )
  }
}

ProductName.propTypes = {
  /** Name of the product */
  name: PropTypes.string.isRequired,
  /** Selected SKU name */
  skuName: PropTypes.string,
  /** Brand name */
  brandName: PropTypes.string,
}

export default ProductName
