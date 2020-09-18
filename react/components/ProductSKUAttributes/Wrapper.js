import React from 'react'
import { isEmpty } from 'ramda'
import useProduct from 'vtex.product-context/useProduct'

import ProductSKUAttributes from './index'

const getVariationsFromSelectedItem = productContext => {
  const { selectedImageVariationSKU } = productContext.skuSelector

  if (selectedImageVariationSKU) {
    const selected = productContext.product.items.filter(item => {
      return item.itemId === selectedImageVariationSKU
    })

    if (selected.length) {
      const [item] = selected

      return item.variations
    }
  }

  return productContext.selectedItem.variations
}

const ProductSKUAttributesWrapper = props => {
  const valuesFromContext = useProduct()

  const ProductSKUAttributesProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    return {
      ...props,
      skuVariations:
        props.skuVariations || getVariationsFromSelectedItem(valuesFromContext),
      styles: props.styles,
      className: props.className,
    }
  }

  return <ProductSKUAttributes {...ProductSKUAttributesProps()} />
}

export default ProductSKUAttributesWrapper
