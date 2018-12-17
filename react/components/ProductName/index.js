import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'

import productName from './productName.css'

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
    /** Component and content loader styles */
    styles: PropTypes.object,
    /** Classes to be applied to root element */
    className: PropTypes.string,
    /** Classes to be applied to brandName element */
    brandNameClass: PropTypes.string,
    /** Classes to be applied to skuName element */
    skuNameClass: PropTypes.string,
    /** Classes to be applied to productReference element */
    productReferenceClass: PropTypes.string,
    /** Classes to be applied to loader root element */
    loaderClass: PropTypes.string,
  }

  static defaultProps = {
    showBrandName: false,
    showProductReference: false,
    showSku: false
  }

  static Loader = (loaderProps = {}) => (
    <div className={`${productName.container} ${productName.loader} ${loaderProps.className}`}>
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        width={456}
        height={100}
        preserveAspectRatio="xMinYMin meet"
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
      productReferenceClass,
      brandNameClass,
      skuNameClass,
      loaderClass,
      className,
      name,
      styles,
      skuName,
      showSku,
      brandName,
      showBrandName,
      productReference,
      showProductReference,
    } = this.props

    if (!name) {
      return (
        <ProductName.Loader className={loaderClass} {...styles} />
      )
    }

    return (
      <div className={`${productName.container} ${className}`}>
        <span className={`${productName.brand} ${brandNameClass}`}>
          {name} {showBrandName && brandName && `- ${brandName}`}
        </span>
        {showSku && skuName && (
          <span className={`${productName.sku} ${skuNameClass}`}>{skuName}</span>
        )}
        {showProductReference && productReference && (
          <span className={`${productName.productReference} ${productReferenceClass}`}>
            {`REF: ${productReference}`}
          </span>
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
