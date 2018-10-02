import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class ProductName extends Component {
  static propTypes = {
    /** Name of the product */
    name: PropTypes.string,
    /** Selected SKU name */
    skuName: PropTypes.string,
    /** Show sku */
    showSku: PropTypes.bool,
    /** Product reference */
    productReference: PropTypes.string,
    /** Show product reference */
    showProductReference: PropTypes.bool,
    /** Brand name */
    brandName: PropTypes.string,
    /** Show brand name */
    showBrandName: PropTypes.bool,
    /** Display large font */
    large: PropTypes.bool,
    /** Component and content loader styles */
    styles: PropTypes.object,
  }

  static defaultProps = {
    large: false,
    showBrandName: false,
    showProductReference: false,
    showSku: false,
  }

  static Loader = (loaderProps = {}) => (
    <div className="vtex-product-name vtex-product-name-loader">
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        height="100%"
        width="100%"
        {...loaderProps}
      >
        <rect
          height="1.125em"
          width="75%"
          x="15%"
          {...loaderProps['vtex-product-name__brand--loader']}
        />
        <rect
          height="1.125em"
          width="50%"
          x="25%"
          y="1.75em"
          {...loaderProps['vtex-product-name__sku--loader']}
        />
      </ContentLoader>
    </div>
  )

  render() {
    const {
      name,
      skuName,
      brandName,
      large,
      showBrandName,
      showProductReference,
      showSku,
      productReference,
    } = this.props

    let brandClasses = 'vtex-product-name__brand'
    let skuClasses = 'vtex-product-name__sku'

    if (large) {
      brandClasses += ' vtex-product-name__brand--large'
      skuClasses += ' vtex-product-name__sku--large'
    }

    if (!name) {
      return (
        <ProductName.Loader
          {...this.props.styles}
          brandClasses={brandClasses}
          skuClasses={skuClasses}
        />
      )
    }

    return (
      <div className="vtex-product-name c-on-base">
        <div className={brandClasses}>
          {name} {showBrandName && brandName && `- ${brandName}`}
        </div>
        {showSku && <div className={skuClasses}>{skuName}</div>}
        {showProductReference && productReference && (
          <div className="vtex-product-name__product-reference pt3 f7 ttu">
            {`REF: ${productReference}`}
          </div>
        )}
      </div>
    )
  }
}

ProductName.schema = {
  title: 'editor.productName.title',
  description: 'editor.productName.description',
  type: 'object',
  properties: {
    showBrandName: {
      type: 'boolean',
      title: 'editor.productName.showBrandName.title',
      default: false,
      isLayout: true,
    },
    showSku: {
      type: 'boolean',
      title: 'editor.productName.showSku.title',
      default: false,
      isLayout: true,
    },
    showProductReference: {
      type: 'boolean',
      title: 'editor.productName.showProductReference.title',
      default: false,
      isLayout: true,
    },
  },
}

export default ProductName
