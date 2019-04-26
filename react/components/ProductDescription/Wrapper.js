import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import ProductDescription from './index';

const ProductDescriptionWrapper = (props) => {
  const valuesFromContext = useContext(ProductContext)

  const productDescriptionProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props

    const { product, selectedItem } = valuesFromContext
    return {
      description: path(['description'], product),
      skuName: path(['name'], selectedItem),
    }
  }

  return (
    <ProductDescription { ...productDescriptionProps() } />
  )
}

export default ProductDescriptionWrapper