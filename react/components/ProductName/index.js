import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import classNames from 'classnames'

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
    /** Extra classes for loader of the component */
    loaderClasses: PropTypes.string,
    /** Component and content loader styles */
    styles: PropTypes.object,
    /** Render all fields of the component */
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    large: false,
    showBrandName: false,
    showProductReference: false,
    showSku: false,
    loaderClasses: '',
    rootClasses: '',
    children: ({ name }) => {
      return <span>{name}</span>
    }
  }

  static Loader = (loaderProps = {}) => (
    <div className={loaderProps.loaderClasses}>
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
      large,
      skuName,
      showSku,
      children,
      brandName,
      loaderClasses,
      showBrandName,
      productReference,
      showProductReference,
    } = this.props

    if (!name) {
      return (
        <ProductName.Loader
          loaderClasses={classNames('vtex-product-name vtex-product-name-loader', loaderClasses)}
          {...this.props.styles}
        />
      )
    }

    return children({
      name,
      large,
      skuName: showSku ? skuName : null,
      brandName: showBrandName ? brandName : null,
      productReference: showProductReference ? productReference : null
    })
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
