import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path } from 'ramda'

import ProductDescription from './index'

const ProductDescriptionWrapper = props => {
  const valuesFromContext = useContext(ProductContext)
  const description =
    props.description != null
      ? props.description
      : path(['product', 'description'], valuesFromContext)

  return (
    <ProductDescription
      description={description}
      showShowMoreButton={props.showShowMoreButton}
    />
  )
}

ProductDescriptionWrapper.defaultProps = {
  showShowMoreButton: true,
}

export default ProductDescriptionWrapper
