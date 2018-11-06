import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import { path } from 'ramda'

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
    /** Classes to apply to elements of the component */
    classes: PropTypes.shape({
      root: PropTypes.string,
      brandName: PropTypes.string,
      skuName: PropTypes.string,
      productReference: PropTypes.string,
      rootLoader: PropTypes.string
    })
  }

  static defaultProps = {
    showBrandName: false,
    showProductReference: false,
    showSku: false,
    classes: {
      root: null,
      brandName: null,
      skuName: null,
      productReference: null,
      rootLoader: null
    }
  }

  static Loader = (loaderProps = {}) => (
    <div className={path(['classes', 'rootLoader'], loaderProps)}>
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        width={456}
        height={100}
        preserveAspectRatio='xMinYMin meet'
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
      classes,
      skuName,
      showSku,
      brandName,
      showBrandName,
      productReference,
      showProductReference,
    } = this.props

    if (!name) {
      return (
        <ProductName.Loader classes={classes} {...this.props.styles} />
      )
    }

    return (
      <div className={classes.root}>
        <span className={classes.brandName}>
          {name} {showBrandName && brandName && `- ${brandName}`}
        </span>
        {showSku && <span className={classes.skuName}>{skuName}</span>}
        {showProductReference && productReference && (
          <span className={classes.productReference}>
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
