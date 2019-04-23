import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import ProductDescription from './index';

export default (props) => {
  const valuesFromContext = React.useContext(ProductContext)

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