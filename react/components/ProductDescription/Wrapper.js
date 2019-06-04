import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import ProductDescription from './index'

const ProductDescriptionWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const isContextEmpty = !valuesFromContext || isEmpty(valuesFromContext)

  const description = isContextEmpty
    ? props.description
    : path(['product', 'description'], valuesFromContext)

  return <ProductDescription description={description} />
}

export default ProductDescriptionWrapper
