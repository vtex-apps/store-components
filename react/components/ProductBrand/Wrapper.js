import React, { useContext } from 'react'
import { path, isEmpty } from 'ramda'

import ProductBrand from './index'

const ProductBrandWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const productBrandProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    const { product } = valuesFromContext

    return {
      ...props,
      brandName: props.brandName || path(['brand'], product),
      className: props.className || 't-heading-4',
    }
  }

  return <ProductBrand {...productBrandProps()} />
}

ProductBrandWrapper.schema = {
  title: 'admin/editor.productName.title',
  description: 'admin/editor.productName.description',
  type: 'object',
  properties: {
    displayMode: {
      type: 'enum',
      title: 'admin/editor.productName.showBrandName.title',
      default: false,
      isLayout: true,
    },
  },
}

export default ProductBrandWrapper
