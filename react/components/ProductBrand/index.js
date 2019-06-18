import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { ProductContext } from 'vtex.product-context'

import productBrand from './productBrand.css'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
const ProductBrand = ({ displayMode }) => {
  const {
    productReferenceClass,
    brandNameClass,
    className,
    brandName,
  } = this.props

  const valuesFromContext = useContext(ProductContext)

  return <div>{brandName}</div>

  if (!name) {
    return <ProductBrand.Loader className={loaderClass} {...styles} />
  }

  return (
    <Wrapper
      className={classNames(
        productBrand.productNameContainer,
        'mv0',
        className
      )}
    >
      <span className={classNames(productBrand.productBrand, brandNameClass)}>
        {name} {showBrandName && brandName && `- ${brandName}`}
      </span>
      {showSku && skuName && (
        <span className={classNames(productBrand.productBrand, skuNameClass)}>
          {skuName}
        </span>
      )}
      {showProductReference && productReference && (
        <span
          className={classNames(
            productBrand.productReference,
            productReferenceClass
          )}
        >
          {`REF: ${productReference}`}
        </span>
      )}
    </Wrapper>
  )
}

ProductBrand.propTypes = {
  /** Brand name */
  brandName: PropTypes.string,
  displayMode: PropTypes.oneOf([
    'logo',
    'text',
    'logoWithoutFallback'
  ]),
  /** Classes to be applied to brandName element */
  brandNameClass: PropTypes.string,
  /** HTML tag to be used in the component container */
  tag: PropTypes.oneOf(['div', 'h1', 'h2', 'h3']),
}


export default ProductBrand
